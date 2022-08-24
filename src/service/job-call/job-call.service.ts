import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JobCallDTO } from 'src/dto/job-call.dto';
import { DataBaseEnum } from 'src/persistence/enum/data-base.enum';
import { JobCallEntity } from 'src/persistence/job-call.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JobCallService {

    constructor(@InjectRepository (JobCallEntity,DataBaseEnum.ORACLE) private jobCallRepository:Repository<JobCallEntity>){
    }


    async newJobCall(jobCallDTO:JobCallDTO){
        const newJobCall:JobCallEntity = this.jobCallRepository.create(jobCallDTO);
        newJobCall.jobCallStatus="SAVED";
        return this.jobCallRepository.save(newJobCall);
    }
}
