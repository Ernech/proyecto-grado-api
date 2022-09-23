import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobCallDTO } from 'src/dto/job-call.dto';
import { AptitudeEntity } from 'src/persistence/aptitude.entity';
import { DataBaseEnum } from 'src/persistence/enum/data-base.enum';
import { JobCallStatusEnum } from 'src/persistence/enum/job-call-status.enum';
import { JobCallEntity } from 'src/persistence/job-call.entity';
import { Repository } from 'typeorm';
import { CronJob } from 'cron';
import { SchedulerRegistry } from '@nestjs/schedule';
@Injectable()
export class JobCallService {

    constructor(@InjectRepository(JobCallEntity, DataBaseEnum.ORACLE) private jobCallRepository: Repository<JobCallEntity>,
        @InjectRepository(AptitudeEntity, DataBaseEnum.ORACLE) private aptitudeRepository: Repository<AptitudeEntity>,
        private readonly schedulerRegistry: SchedulerRegistry) {
    }


    async newJobCall(jobCallDTO: JobCallDTO) {
        const newJobCall: JobCallEntity = this.jobCallRepository.create(jobCallDTO);
        if (newJobCall.openingDate >= newJobCall.closingDate) {
            throw new BadRequestException("Fecha de apertura incorrecta")
        }
        //TODO-Change job call status back to saved
        newJobCall.jobCallStatus = JobCallStatusEnum.OPEN;
        return this.jobCallRepository.save(newJobCall);
    }

    async getJobCalls(jobCallStatus: string) {
        const savedJobCalls: JobCallEntity[] = await
            this.jobCallRepository.createQueryBuilder('jobCall').select([
                'jobCall.id',
                'jobCall.jobCallName',
                'jobCall.jobCallNumber',
                'jobCall.jobCallObj',
                'jobCall.jobManualFile',
                'jobCall.jobInfoFile',
                'jobCall.openingDate',
                'jobCall.closingDate',

            ]).innerJoinAndSelect('jobCall.aptitudes', 'aptitude')
                .innerJoinAndSelect('jobCall.jobFunctions', 'jobFunction')
                .innerJoinAndSelect('jobCall.experiences', 'experience')
                .innerJoinAndSelect('jobCall.academicTrainings', 'academicTraining')
                .innerJoinAndSelect('jobCall.requiredKnowledge', 'requiredKnowledge')
                .where('jobCall.jobCallStatus=:jobCallStatus', { jobCallStatus })
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
    async getJobCallById(jobCallId: string) {
        const savedJobCall: JobCallEntity = await
            this.jobCallRepository.createQueryBuilder('jobCall').select([
                'jobCall.id',
                'jobCall.jobCallName',
                'jobCall.jobCallNumber',
                'jobCall.jobCallObj',
                'jobCall.jobManualFile',
                'jobCall.jobInfoFile',
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

    async publishJobCall(id: string) {
        const jobCall: JobCallEntity = await this.getJobCallById(id);
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
            this.openJobCall(jobCall.openingDate, jobCall.id)
            this.closeJobCall(jobCall.closingDate, jobCall.id)
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
}
