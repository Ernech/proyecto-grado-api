import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplyCVDataEntity } from 'src/persistence/apply-cv-data.entity';
import { ApplyPersonalDataEntity } from 'src/persistence/apply-personal-data.entity';
import { ApplyTCVDataEntity } from 'src/persistence/apply-t-cv-data.entity';
import { ApplyTPersonalDataEntity } from 'src/persistence/apply-t-personal-data.entity';
import { ApplyEntity } from 'src/persistence/apply.entity';
import { DataBaseEnum } from 'src/persistence/enum/data-base.enum';
import { JobCallEntity } from 'src/persistence/job-call.entity';
import { TeacherApplyEntity } from 'src/persistence/teacher-apply.entity';
import { TeacherJobCallEntity } from 'src/persistence/teacher-job-call.entity';
import { Repository } from 'typeorm';
import { CvService } from '../cv/cv.service';
import { JobCallService } from '../job-call/job-call.service';
import { UserService } from '../user/user.service';
import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { CvEvaluationService } from '../cv-evaluation/cv-evaluation.service';
@Injectable()
export class JobApplyService {

    constructor(private cvService: CvService, private jobCallService: JobCallService, private userService: UserService, private cvEvaluationService:CvEvaluationService,
        @InjectRepository(ApplyEntity, DataBaseEnum.ORACLE) private applyRepository: Repository<ApplyEntity>,
        @InjectRepository(ApplyPersonalDataEntity, DataBaseEnum.ORACLE) private applyPersonalDataRepository: Repository<ApplyPersonalDataEntity>,
        @InjectRepository(ApplyCVDataEntity, DataBaseEnum.ORACLE) private applyCVDataRepository: Repository<ApplyCVDataEntity>,
        @InjectRepository(TeacherApplyEntity, DataBaseEnum.ORACLE) private teacherApplyRepository: Repository<TeacherApplyEntity>,
        @InjectRepository(ApplyTPersonalDataEntity, DataBaseEnum.ORACLE) private applyTPersonalDataRepository: Repository<ApplyTPersonalDataEntity>,
        @InjectRepository(ApplyTCVDataEntity, DataBaseEnum.ORACLE) private applyTCVDataRepository: Repository<ApplyTCVDataEntity>,
        @InjectRepository(JobCallEntity, DataBaseEnum.ORACLE) private jobCallRepository: Repository<JobCallEntity>,
        @InjectRepository(TeacherJobCallEntity, DataBaseEnum.ORACLE) private teacherJobCallRepository: Repository<TeacherJobCallEntity>,
        private readonly httpService: HttpService
    ) { }


    async newJobApply(candidateId: string, jobCallId: string) {
        const newApply: ApplyEntity = new ApplyEntity();
        const { personalData, cvData } = await this.cvService.getCVByCandidateId(candidateId)
        const jobcall = await this.jobCallService.getJobCallById(jobCallId)
        const candiate = await this.userService.getCandidateById(candidateId)
        const newApplyPersonalData: ApplyPersonalDataEntity = this.applyPersonalDataRepository.create(personalData)
        newApplyPersonalData.candidateId = candidateId
        const newApplyCVData: ApplyCVDataEntity[] = this.applyCVDataRepository.create(cvData)
        newApplyCVData.forEach(obj => obj.candidateId = candidateId)
        newApply.candidate = candiate,
            newApply.jobCall = jobcall,
            newApply.applyPersonalData = newApplyPersonalData,
            newApply.applyCVData = newApplyCVData
        return this.applyRepository.save(newApply)

    }

    async newTeacherJobApply(candidateId: string, teacherJobCallId: string) {
        const newTeacherApply: TeacherApplyEntity = new TeacherApplyEntity();
        const { personalData, cvData } = await this.cvService.getCVByCandidateId(candidateId)
        const jobcall = await this.jobCallService.getTeacherJobCallEntityById(teacherJobCallId)
        const candiate = await this.userService.getCandidateById(candidateId)
        const newApplyPersonalData: ApplyTPersonalDataEntity = this.applyTPersonalDataRepository.create(personalData)
        newApplyPersonalData.candidateId = candidateId
        const newApplyTCVData: ApplyTCVDataEntity[] = this.applyTCVDataRepository.create(cvData)
        newApplyTCVData.forEach(obj => obj.candidateId = candidateId)
        newTeacherApply.candidate = candiate,
            newTeacherApply.teacherJobCall = jobcall,
            newTeacherApply.applyTPersonalData = newApplyPersonalData,
            newTeacherApply.applyTCVData = newApplyTCVData
        return this.teacherApplyRepository.save(newTeacherApply)

    }
    async getJobCallApplyById(id: string) {
        const apply: ApplyEntity = await
            this.applyRepository.createQueryBuilder('apply').select([
                'apply.id',
                'apply.applyStatus',
                'apply.applyDate'
            ])
                .innerJoinAndSelect('apply.applyPersonalData', 'applyPersonalData')
                .innerJoinAndSelect('apply.applyCVData', 'applyCVData')
                .andWhere('apply.status=:status', { status: 1 })
                .andWhere('applyPersonalData.status=:status', { status: 1 })
                .andWhere('applyCVData.status=:status', { status: 1 })
                .andWhere('apply.id=:id', { id })
                .getOne();

        return apply
    }

    async getTeacherJobCallApplyById(id: string) {
        const teacherApply: TeacherApplyEntity = await
            this.teacherApplyRepository.createQueryBuilder('teacheApply').select([
                'teacheApply.id',
                'teacheApply.applyStatus',
                'teacheApply.applyDate'
            ])
                .innerJoinAndSelect('teacheApply.applyTPersonalData', 'applyTPersonalData')
                .innerJoinAndSelect('teacheApply.applyTCVData', 'applyTCVData')
                .andWhere('teacheApply.status=:status', { status: 1 })
                .andWhere('applyTPersonalData.status=:status', { status: 1 })
                .andWhere('applyTCVData.status=:status', { status: 1 })
                .andWhere('teacheApply.id=:id', { id })
                .getOne();

        return teacherApply
    }

    async getCandidateJobCallsApplies(id: string) {
        const jobCallApplies: JobCallEntity[] = await this.jobCallRepository.createQueryBuilder('jobCall')
            .select([
                'jobCall.id',
                'jobCall.jobCallName',
                'jobCall.jobCallNumber',
                'jobCall.openingDate',
                'jobCall.closingDate',
                'jobCall.jobCallStatus'
            ])
            .innerJoinAndSelect('jobCall.apply', 'apply')
            .innerJoin('apply.candidate', 'candidate')
            .where('jobCall.status=:status', { status: 1 })
            .andWhere('apply.status=:status', { status: 1 })
            .andWhere('candidate.status=:status', { status: 1 })
            .andWhere('candidate.id=:id', { id })
            .getMany()
        return jobCallApplies
    }

    async getCandidateTeacherJobCallsApplies(id: string) {
        const teacherJobCallApplies: TeacherJobCallEntity[] = await this.teacherJobCallRepository.createQueryBuilder('teacherJobCall')
            .innerJoinAndSelect('teacherJobCall.teacherApply', 'teacherApply')
            .innerJoinAndSelect('teacherJobCall.collegeClass', 'collegeClass')
            .innerJoin('teacherApply.candidate', 'candidate')
            .innerJoin('teacherJobCall.jobCall', 'jobCall')
            .where('jobCall.status=:status', { status: 1 })
            .where('teacherJobCall.status=:status', { status: 1 })
            .andWhere('teacherApply.status=:status', { status: 1 })
            .andWhere('candidate.status=:status', { status: 1 })
            .andWhere('candidate.id=:id', { id })
            .getMany()
        return teacherJobCallApplies
    }

    async getProffesionalTitleFromJobCallApply(id: string) {
        const data: ApplyCVDataEntity = await this.applyCVDataRepository.createQueryBuilder('applyCVData')
            .select([
                'applyCVData.professionalTitleFile',
                'applyCVData.professionalTitleFileName'
            ])
            .where('applyCVData.id=:id', { id })
            .andWhere('applyCVData.status=:status', { status: 1 })
            .getOne()
        return data
    }

    async prediction(teacherApplyId:string,){

        const teacherApply :TeacherApplyEntity= await this.getTeacherJobCallApplyById(teacherApplyId)
        
        const proffesionalTitleIndexed=await this.cvEvaluationService.academicTitleIndexed(teacherApply.applyTCVData)
        const proffesionalNTitleIndexed=await this.cvEvaluationService.academicNTitleIndexed(teacherApply.applyTCVData)
        const teachingTitle = this.cvEvaluationService.teachingTitleIndexed(teacherApply.applyTPersonalData)
        const personalIdFile=this.cvEvaluationService.personalIdIndexed(teacherApply.applyTPersonalData)
        const hasAcademicTraining = await this.cvEvaluationService.hasAcademicTraining(teacherApply.applyTCVData)
        const hasProfessionalTimeExperience = await this.cvEvaluationService.hasProfessionalTimeExperience(teacherApply.applyTCVData)
        const hasTeachingTiemExperience =  this.cvEvaluationService.hasTeachingExperience(teacherApply.applyTPersonalData)
       
        const dataToPedict = {
                 "HOJA DE VIDA": [1],
                 "PLAN DE ASIGNATURA": [1],
                 "TÍTULO ACADÉMICO": [proffesionalTitleIndexed],
                 "TÍTULO EN PROVICIÓN NACIONAL": [proffesionalNTitleIndexed],
                 "DIPLOMADO EN EDUCACIÓN SUPERIOR": [teachingTitle],
                 "CI":[personalIdFile],
                 "FORMACIÓN ACADÉMICA":[hasAcademicTraining],
                 "EXPERIENCIA PROFESIONAL":[hasProfessionalTimeExperience],
                 "EXPERIENCIA DOCENTE UNIVERISATRIA":[hasTeachingTiemExperience]
            }
       console.log(dataToPedict);
        const data = await firstValueFrom(this.httpService.post('http://127.0.0.1:5000/logistic-regresion', dataToPedict)
            .pipe(map(resp => resp.data)));
        return data;
        
    }
}


