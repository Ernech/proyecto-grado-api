import { BadRequestException, Injectable, NotFoundException,HttpException ,HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobCallDTO } from 'src/dto/job-call.dto';
import { AptitudeEntity } from 'src/persistence/aptitude.entity';
import { DataBaseEnum } from 'src/persistence/enum/data-base.enum';
import { JobCallStatusEnum } from 'src/persistence/enum/job-call-status.enum';
import { JobCallEntity } from 'src/persistence/job-call.entity';
import { Repository } from 'typeorm';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
import { JobCallPositionEnum } from 'src/persistence/enum/job_call_type.enum';
import { NewTeacherJobCallDTO } from 'src/dto/new-teacher-job-call.dto';
import { TeacherJobCallEntity } from 'src/persistence/teacher-job-call.entity';
import { CollegeClassService } from '../college-class/college-class.service';
import { RequirementEntity } from 'src/persistence/requirement.entity';
import { CollegeClassEntity } from 'src/persistence/college-class.entity';
import { AddCollegeClassDTO } from 'src/dto/add-college-class.dto';
import { ApplyEntity } from 'src/persistence/apply.entity';
@Injectable()
export class JobCallService {

    constructor(@InjectRepository(JobCallEntity, DataBaseEnum.ORACLE) private jobCallRepository: Repository<JobCallEntity>,
        @InjectRepository(RequirementEntity, DataBaseEnum.ORACLE) private requirementRepository: Repository<RequirementEntity>,
        @InjectRepository(TeacherJobCallEntity, DataBaseEnum.ORACLE) private teacherJobCallRepository: Repository<TeacherJobCallEntity>,
        @InjectRepository(AptitudeEntity, DataBaseEnum.ORACLE) private aptitudeRepository: Repository<AptitudeEntity>,
        @InjectRepository(CollegeClassEntity, DataBaseEnum.ORACLE) private collegeClassRepository: Repository<CollegeClassEntity>,
        private readonly schedulerRegistry: SchedulerRegistry,
        private collegeClassService: CollegeClassService) {
    }


    async newJobCall(jobCallDTO: JobCallDTO) {
        const newJobCall: JobCallEntity = this.jobCallRepository.create(jobCallDTO);
        if (newJobCall.openingDate >= newJobCall.closingDate) {
            throw new BadRequestException("Fecha de apertura incorrecta")
        }
        newJobCall.position = JobCallPositionEnum.ADMINISTRATIVE;
        newJobCall.jobCallStatus = JobCallStatusEnum.SAVED;
        return this.jobCallRepository.save(newJobCall);
    }

    async newTeacherJobCall(jobCallDTO: NewTeacherJobCallDTO) {
        const newJobCall: JobCallEntity = this.jobCallRepository.create(jobCallDTO.teacherJobCall);
        if (newJobCall.openingDate >= newJobCall.closingDate) {
            throw new BadRequestException("Fecha de apertura incorrecta")
        }
        if (jobCallDTO.newCareerClass.length !== null && jobCallDTO.newCareerClass.length > 0) {
            const techerJobCallArray: TeacherJobCallEntity[] = []
            for (let i = 0; i < jobCallDTO.newCareerClass.length; i++) {
                const newTeacherJobCall: TeacherJobCallEntity = new TeacherJobCallEntity()
                const collegeClass: CollegeClassEntity = await this.collegeClassService.getCollegeClassById(jobCallDTO.newCareerClass[i].id)
                const requirements: RequirementEntity[] = this.requirementRepository.create(jobCallDTO.newCareerClass[i].requirements)
                newTeacherJobCall.collegeClass = collegeClass
                newTeacherJobCall.requirements = requirements
                newTeacherJobCall.requiredNumber = jobCallDTO.newCareerClass[i].requiredNumber
                newTeacherJobCall.jobCallCode = jobCallDTO.newCareerClass[i].jobCallCode
                techerJobCallArray.push(newTeacherJobCall)
            }
            newJobCall.teacherJobCalls = techerJobCallArray
        }
        newJobCall.position = JobCallPositionEnum.TEACHER;
        newJobCall.jobCallStatus = JobCallStatusEnum.SAVED;
        return await this.jobCallRepository.save(newJobCall)


    }


    async editTeacherJobCall(jobCallId: string, newJobCallDTO: NewTeacherJobCallDTO) {
        const jobCall = await this.getTeacherJobCallById(jobCallId);
        const newJobCall = this.jobCallRepository.create(newJobCallDTO.teacherJobCall)
        this.jobCallRepository.merge(jobCall, newJobCall)
        if (jobCall.openingDate < new Date() || jobCall.openingDate >= jobCall.closingDate) {
            throw new BadRequestException("Fecha de apertura incorrecta")
        }
        if (newJobCallDTO.newCareerClass.length !== null && newJobCallDTO.newCareerClass.length > 0) {
            const techerJobCallArray: TeacherJobCallEntity[] = []
            for (let i = 0; i < newJobCallDTO.newCareerClass.length; i++) {
                const newTeacherJobCall: TeacherJobCallEntity = new TeacherJobCallEntity()
                const collegeClass: CollegeClassEntity = await this.collegeClassService.getCollegeClassById(newJobCallDTO.newCareerClass[i].id)
                const requirements: RequirementEntity[] = this.requirementRepository.create(newJobCallDTO.newCareerClass[i].requirements)
                newTeacherJobCall.collegeClass = collegeClass
                newTeacherJobCall.requirements = requirements
                newTeacherJobCall.requiredNumber = newJobCallDTO.newCareerClass[i].requiredNumber
                newTeacherJobCall.jobCallCode = newJobCallDTO.newCareerClass[i].jobCallCode
                techerJobCallArray.push(newTeacherJobCall)
            }
            jobCall.position = JobCallPositionEnum.TEACHER;
            jobCall.jobCallStatus = JobCallStatusEnum.SAVED;
            jobCall.teacherJobCalls = techerJobCallArray
        }
        return await this.jobCallRepository.save(jobCall)


    }


    async addCollegeClassesToJobCall(jobCallId: string, collegeClasses: AddCollegeClassDTO) {
        const jobCall: JobCallEntity = await this.getTeacherJobCallById(jobCallId)
        if (collegeClasses.newCareerClass && collegeClasses.newCareerClass.length > 0) {
            let teacherJobCallArray: TeacherJobCallEntity[] = []
            if (jobCall.teacherJobCalls && jobCall.teacherJobCalls.length > 0) {
                teacherJobCallArray = jobCall.teacherJobCalls
            }
            for (let i = 0; i < collegeClasses.newCareerClass.length; i++) {
                const newTeacherJobCall: TeacherJobCallEntity = new TeacherJobCallEntity()
                const collegeClass: CollegeClassEntity = await this.collegeClassService.getCollegeClassById(collegeClasses.newCareerClass[i].id)
                const requirements: RequirementEntity[] = this.requirementRepository.create(collegeClasses.newCareerClass[i].requirements)
                newTeacherJobCall.collegeClass = collegeClass
                newTeacherJobCall.requirements = requirements
                newTeacherJobCall.requiredNumber = collegeClasses.newCareerClass[i].requiredNumber
                newTeacherJobCall.jobCallCode = collegeClasses.newCareerClass[i].jobCallCode
                teacherJobCallArray.push(newTeacherJobCall)
            }
            jobCall.teacherJobCalls = teacherJobCallArray
        }
        return await this.jobCallRepository.save(jobCall)
    }

    async getTeacherJobCallById(id: string) {
        const teacherJobCall: JobCallEntity = await
            this.jobCallRepository.createQueryBuilder('jobCall').select([
                'jobCall.id',
                'jobCall.jobCallName',
                'jobCall.jobCallNumber',
                'jobCall.jobManualFile',
                'jobCall.openingDate',
                'jobCall.closingDate',
            ]).innerJoinAndSelect('jobCall.teacherJobCalls', 'teacherJobCall')
                .innerJoinAndSelect('teacherJobCall.requirements', 'requirement')
                .innerJoinAndSelect('teacherJobCall.collegeClass', 'collegeClass')
                .loadRelationCountAndMap('teacherJobCall.candidates', 'teacherJobCall.teacherApply','teacherApply',qb=>qb.where('teacherApply.status=:status',{status:1}))
                .where('jobCall.position=:position', { position: JobCallPositionEnum.TEACHER })
                .andWhere('jobCall.status=:status', { status: 1 })
                .andWhere('collegeClass.status=:status', { status: 1 })
                .andWhere('teacherJobCall.status=:status', { status: 1 })
                .andWhere('requirement.status=:status', { status: 1 })
                .andWhere('jobCall.id=:id', { id })
                .getOne();
        if (!teacherJobCall) {
            throw new NotFoundException("Convocatoria no encontrada")
        }
        return teacherJobCall
    }
    async getJobCalls(jobCallStatus: string) {

        const savedJobCalls: JobCallEntity[] = await
            this.jobCallRepository.createQueryBuilder('jobCall').select([
                'jobCall.id',
                'jobCall.jobCallName',
                'jobCall.jobCallNumber',
                'jobCall.jobCallObj',
                'jobCall.jobManualFile',
                'jobCall.openingDate',
                'jobCall.closingDate',

            ]).innerJoinAndSelect('jobCall.aptitudes', 'aptitude')
                .innerJoinAndSelect('jobCall.jobFunctions', 'jobFunction')
                .innerJoinAndSelect('jobCall.experiences', 'experience')
                .innerJoinAndSelect('jobCall.academicTrainings', 'academicTraining')
                .innerJoinAndSelect('jobCall.requiredKnowledge', 'requiredKnowledge')
                .where('jobCall.jobCallStatus=:jobCallStatus', { jobCallStatus })
                .andWhere('jobCall.position=:position', { position: JobCallPositionEnum.ADMINISTRATIVE })
                .andWhere('jobCall.status=:status', { status: 1 })
                .andWhere('aptitude.status=:status', { status: 1 })
                .andWhere('jobFunction.status=:status', { status: 1 })
                .andWhere('experience.status=:status', { status: 1 })
                .andWhere('academicTraining.status=:status', { status: 1 })
                .andWhere('requiredKnowledge.status=:status', { status: 1 })
                .getMany();
        return savedJobCalls;
    }
    async editJobCall(jobCallId: string, newJobCall: JobCallDTO) {
        const jobCall = await this.getJobCallById(jobCallId);
        const newJobCallEntity = this.jobCallRepository.create(newJobCall)
        this.jobCallRepository.merge(jobCall, newJobCall)
        jobCall.aptitudes = newJobCallEntity.aptitudes;
        jobCall.experiences = newJobCallEntity.experiences;
        jobCall.academicTrainings = newJobCallEntity.academicTrainings;
        jobCall.jobFunctions = newJobCallEntity.jobFunctions;
        jobCall.requiredKnowledge = newJobCallEntity.requiredKnowledge
        return await this.jobCallRepository.save(jobCall)

    }

    async getTeacherJobCall(jobCallStatus: string) {
        const savedJobCalls: JobCallEntity[] = await
            this.jobCallRepository.createQueryBuilder('jobCall').select([
                'jobCall.id',
                'jobCall.jobCallName',
                'jobCall.jobCallNumber',
                'jobCall.jobManualFile',
                'jobCall.openingDate',
                'jobCall.closingDate',
            ]).innerJoinAndSelect('jobCall.teacherJobCalls', 'teacherJobCall')
                .innerJoinAndSelect('teacherJobCall.requirements', 'requirement')
                .innerJoinAndSelect('teacherJobCall.collegeClass', 'collegeClass')
                .where('jobCall.jobCallStatus=:jobCallStatus', { jobCallStatus })
                .andWhere('jobCall.position=:position', { position: JobCallPositionEnum.TEACHER })
                .andWhere('jobCall.status=:status', { status: 1 })
                .andWhere('collegeClass.status=:status', { status: 1 })
                .andWhere('teacherJobCall.status=:status', { status: 1 })
                .andWhere('requirement.status=:status', { status: 1 })
                .getMany();
        return savedJobCalls
    }
    async getTeacherJobCallInfoById(id: string) {
        const teacherJobCallInfo: TeacherJobCallEntity = await this.teacherJobCallRepository.createQueryBuilder('teacherJobCall')
            .select([
                'teacherJobCall.id',
                'teacherJobCall.jobCallCode',
            ]).innerJoinAndSelect('teacherJobCall.requirements', 'requirement')
            .innerJoinAndSelect('teacherJobCall.collegeClass', 'collegeClass')
            .innerJoinAndSelect('teacherJobCall.jobCall','jobCall')
            .where('teacherJobCall.id=:id', { id })
            .andWhere('collegeClass.status=:status', { status: 1 })
            .andWhere('teacherJobCall.status=:status', { status: 1 })
            .andWhere('requirement.status=:status', { status: 1 })
            .getOne()
        return teacherJobCallInfo

    }
    async getJobCallById(jobCallId: string) {
        const savedJobCall: JobCallEntity = await
            this.jobCallRepository.createQueryBuilder('jobCall').select([
                'jobCall.id',
                'jobCall.jobCallName',
                'jobCall.jobCallNumber',
                'jobCall.jobCallObj',
                'jobCall.jobManualFile',
                'jobCall.jobManualFileName',
                'jobCall.openingDate',
                'jobCall.closingDate',

            ]).innerJoinAndSelect('jobCall.aptitudes', 'aptitude')
                .innerJoinAndSelect('jobCall.jobFunctions', 'jobFunction')
                .innerJoinAndSelect('jobCall.experiences', 'experience')
                .innerJoinAndSelect('jobCall.academicTrainings', 'academicTraining')
                .innerJoinAndSelect('jobCall.requiredKnowledge', 'requiredKnowledge')
                .andWhere('jobCall.status=:status', { status: 1 })
                .andWhere('aptitude.status=:status', { status: 1 })
                .andWhere('jobFunction.status=:status', { status: 1 })
                .andWhere('experience.status=:status', { status: 1 })
                .andWhere('academicTraining.status=:status', { status: 1 })
                .andWhere('requiredKnowledge.status=:status', { status: 1 })
                .andWhere('jobCall.id=:id', { id: jobCallId })
                .getOne();
        if (!savedJobCall) {
            throw new NotFoundException("Convocatoria no encontrada")
        }
        return savedJobCall;
    }


    async getTeacherJobCallEntityById(id: string) {

        const teacherJobCallEntity: TeacherJobCallEntity = await this.teacherJobCallRepository.createQueryBuilder('teacherJobCall').select([
            'teacherJobCall.id',
            'teacherJobCall.requiredNumber',
            'teacherJobCall.jobCallCode'
        ]).innerJoinAndSelect('teacherJobCall.collegeClass','collegeClass')
        .where('teacherJobCall.status=:status',{status:1}).
        andWhere('collegeClass.status=:status',{status:1})
        .andWhere('teacherJobCall.id=:id',{id})
        .getOne()
        if (!teacherJobCallEntity) {
            throw new NotFoundException('Convocatoria no encontrada')
        }
        return teacherJobCallEntity;

    }

    async getJobCallWithCandidatesByJobCallId(id: string, status: string) {
        const savedJobCall: JobCallEntity = await
            this.jobCallRepository.createQueryBuilder('jobCall').select([
                'jobCall.id',
                'jobCall.jobCallName',
                'jobCall.jobCallNumber',
                'jobCall.jobCallObj',
                'jobCall.jobManualFile',
                'jobCall.jobManualFileName',
                'jobCall.openingDate',
                'jobCall.closingDate',

            ]).innerJoinAndSelect('jobCall.apply', 'apply')
                .innerJoinAndSelect('apply.applyPersonalData', 'applyPersonalData')
                .innerJoinAndSelect('apply.applyCVData', 'applyCVData')
                .where('jobCall.jobCallStatus=:jobCallStatus', { jobCallStatus: status })
                .andWhere('jobCall.status=:status', { status: 1 })
                .andWhere('apply.status=:status', { status: 1 })
                .andWhere('applyPersonalData.status=:status', { status: 1 })
                .andWhere('applyCVData.status=:status', { status: 1 })
                .andWhere('jobCall.id=:id', { id })
                .getOne();
        if(savedJobCall){
            return savedJobCall
        }
        return this.getJobCallById(id)
    }

    

    async getTeacherJobCallWithCandidatesByJobCallId(id: string) {
        const savedJobCall: TeacherJobCallEntity = await
            this.teacherJobCallRepository.createQueryBuilder('teacherJobCall').select([
                'teacherJobCall.id',
                'teacherJobCall.jobCallCode',
                'teacherJobCall.requiredNumber'
            ]).innerJoinAndSelect('teacherJobCall.teacherApply', 'teacherApply')
                .innerJoinAndSelect('teacherApply.applyTPersonalData', 'applyTPersonalData')
                .innerJoinAndSelect('teacherApply.applyTCVData', 'applyTCVData')
                .innerJoinAndSelect('teacherJobCall.collegeClass','collegeClass')
                .andWhere('teacherJobCall.status=:status', { status: 1 })
                .andWhere('teacherApply.status=:status', { status: 1 })
                .andWhere('applyTPersonalData.status=:status', { status: 1 })
                .andWhere('applyTCVData.status=:status', { status: 1 })
                .andWhere('teacherJobCall.id=:id', { id })
                .getOne();
        return savedJobCall
    }
    async publishJobCall(id: string) {
        const jobCall: JobCallEntity = await this.getJobCallById(id);
        const today = new Date()
        if (jobCall.openingDate < today) {
            throw new BadRequestException("Fecha de apertura incorrecta")
        }
        else if (jobCall.openingDate === today) {
            jobCall.jobCallStatus = JobCallStatusEnum.OPEN
            await this.jobCallRepository.save(jobCall)
        
        }
        else if (jobCall.openingDate > today) {
            jobCall.jobCallStatus = JobCallStatusEnum.PENDING
            await this.jobCallRepository.save(jobCall)
            this.openJobCall(jobCall.openingDate, jobCall.id)
            this.closeJobCall(jobCall.closingDate, jobCall.id)
        }


    };
    async publishTeacherJobCall(id: string) {
        const openedJobCalls = await this.getTeacherJobCall(JobCallStatusEnum.OPEN)
        const pendingJobCalls = await this.getTeacherJobCall(JobCallStatusEnum.PENDING)
        if(openedJobCalls.length>0 || pendingJobCalls.length>0 ){
            throw new HttpException("Ya existen convocatorias abiertas o pendientes",HttpStatus.FORBIDDEN)
        }
        const jobCall: JobCallEntity = await this.getTeacherJobCallById(id);
        const today = new Date()
        today.setHours(today.getHours() - 4)
        if (jobCall.openingDate < today) {
            throw new BadRequestException("Fecha de apertura incorrecta")
        }
        else if (jobCall.openingDate === today) {
            jobCall.jobCallStatus = JobCallStatusEnum.OPEN
        }
        else if (jobCall.openingDate > today) {
            jobCall.jobCallStatus = JobCallStatusEnum.PENDING
            this.openTeacherJobCall(jobCall.openingDate, jobCall.id)
            this.closeTeacherJobCall(jobCall.closingDate, jobCall.id)
        }
        await this.jobCallRepository.save(jobCall)
    };

    async openJobCallById(jobCallId: string) {
        const jobCall: JobCallEntity = await this.getJobCallById(jobCallId);
        jobCall.jobCallStatus = JobCallStatusEnum.OPEN
        await this.jobCallRepository.save(jobCall)
    }

    async closeJobCallById(jobCallId: string) {
        const jobCall: JobCallEntity = await this.getJobCallById(jobCallId);
        jobCall.jobCallStatus = JobCallStatusEnum.CLOSED
        await this.jobCallRepository.save(jobCall)
    }
    async openTeacherJobCallById(jobCallId: string) {
        const jobCall: JobCallEntity = await this.getTeacherJobCallById(jobCallId);
        jobCall.jobCallStatus = JobCallStatusEnum.OPEN
        await this.jobCallRepository.save(jobCall)
    }

    async closeTeacherJobCallById(jobCallId: string) {
        const jobCall: JobCallEntity = await this.getTeacherJobCallById(jobCallId);
        jobCall.jobCallStatus = JobCallStatusEnum.CLOSED
        await this.jobCallRepository.save(jobCall)
    }

    openJobCall(openingDate: Date, jobCallId: string) {
        const openJobCall = new CronJob(openingDate, async () => {
            await this.openJobCallById(jobCallId)
        })
        this.schedulerRegistry.addCronJob(`open-job-call-${jobCallId}`, openJobCall)
        openJobCall.start()
    }
    closeJobCall(closingDate: Date, jobCallId: string) {
       
        const closeJobCall = new CronJob(closingDate, async () => {
            await this.closeJobCallById(jobCallId)
        })
        this.schedulerRegistry.addCronJob(`close-job-call-${jobCallId}`, closeJobCall)
        closeJobCall.start()
    }
    openTeacherJobCall(openingDate: Date, jobCallId: string) {
        const openJobCall = new CronJob(openingDate, async () => {
            await this.openTeacherJobCallById(jobCallId)
        })
        this.schedulerRegistry.addCronJob(`open-job-call-${jobCallId}`, openJobCall)
        openJobCall.start()
    }
    closeTeacherJobCall(closingDate: Date, jobCallId: string) {
        const closeJobCall = new CronJob(closingDate, async () => {
            await this.closeTeacherJobCallById(jobCallId)
        })
        this.schedulerRegistry.addCronJob(`close-job-call-${jobCallId}`, closeJobCall)
        closeJobCall.start()
    }
}
