import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobCallDTO } from 'src/dto/job-call.dto';
import { AptitudeEntity } from 'src/persistence/aptitude.entity';
import { DataBaseEnum } from 'src/persistence/enum/data-base.enum';
import { JobCallEntity } from 'src/persistence/job-call.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobCallService {

    constructor(@InjectRepository(JobCallEntity, DataBaseEnum.ORACLE) private jobCallRepository: Repository<JobCallEntity>,
        @InjectRepository(AptitudeEntity, DataBaseEnum.ORACLE) private aptitudeRepository: Repository<AptitudeEntity>) {
    }


    async newJobCall(jobCallDTO: JobCallDTO) {
        const newJobCall: JobCallEntity = this.jobCallRepository.create(jobCallDTO);
        newJobCall.jobCallStatus = "SAVED";
        return this.jobCallRepository.save(newJobCall);
    }

    async getJobCalls(jobCallStatus:string) {
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
           
        ]).innerJoinAndSelect('jobCall.aptitudes','aptitude')
        .innerJoinAndSelect('jobCall.jobFunctions','jobFunction')
        .innerJoinAndSelect('jobCall.experiences','experience')
        .innerJoinAndSelect('jobCall.academicTrainings','academicTraining')
        .innerJoinAndSelect('jobCall.requiredKnowledge','requiredKnowledge')
        .where('jobCall.jobCallStatus=:jobCallStatus',{jobCallStatus})
        .andWhere('jobCall.status=:status',{status: 1})
        .andWhere('aptitude.status=:status', { status: 1 })
        .andWhere('jobFunction.status=:status', { status: 1 })
        .andWhere('experience.status=:status', { status: 1 })
        .andWhere('academicTraining.status=:status', { status: 1 })
        .andWhere('requiredKnowledge.status=:status', { status: 1 })
        .getMany();
        return savedJobCalls;
    }

    async getAptitudesFromJobCall(jobCallId: string) {
        const aptitudes: AptitudeEntity[] = await this.aptitudeRepository
            .createQueryBuilder('aptitude').innerJoinAndSelect('aptitude.jobCall', 'jobCall').
            select([
                'aptitude.id', 
                'aptitude.aptitude',
                'aptitude.aptitudeType',
                'aptitude.desiredLevel'
            ]).where('jobCall.id=:id', { id: jobCallId })
            .andWhere('jobCall.status=:status', { status: 1 })
            .andWhere('aptitude.status=:status', { status: 1 })
            .getMany();
        return aptitudes;
    }
}
