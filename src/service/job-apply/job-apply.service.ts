import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplyCVDataEntity } from 'src/persistence/apply-cv-data.entity';
import { ApplyPersonalDataEntity } from 'src/persistence/apply-personal-data.entity';
import { ApplyEntity } from 'src/persistence/apply.entity';
import { DataBaseEnum } from 'src/persistence/enum/data-base.enum';
import { Repository } from 'typeorm';
import { CvService } from '../cv/cv.service';
import { JobCallService } from '../job-call/job-call.service';
import { UserService } from '../user/user.service';

@Injectable()
export class JobApplyService {

    constructor(private cvService:CvService, private jobCallService:JobCallService,private userService:UserService,
        @InjectRepository(ApplyEntity,DataBaseEnum.ORACLE) private applyRepository:Repository<ApplyEntity>,
        @InjectRepository(ApplyPersonalDataEntity,DataBaseEnum.ORACLE) private applyPersonalDataRepository:Repository<ApplyPersonalDataEntity>,
        @InjectRepository(ApplyCVDataEntity,DataBaseEnum.ORACLE) private applyCVDataRepository:Repository<ApplyCVDataEntity>){}


    async newJobApply(candidateId:string,jobCallId:string){
        const newApply:ApplyEntity = new ApplyEntity();
        const {personalData,cvData} = await this.cvService.getCVByCandidateId(candidateId)
        const jobcall =  await this.jobCallService.getJobCallById(jobCallId)
        const candiate = await this.userService.getCandidateById(candidateId)
        const newApplyPersonalData:ApplyPersonalDataEntity=this.applyPersonalDataRepository.create(personalData)
        const newApplyCVData:ApplyCVDataEntity[]=this.applyCVDataRepository.create(cvData)
        newApply.candidate=candiate,
        newApply.jobCall=jobcall,
        newApply.applyPersonalData=newApplyPersonalData,
        newApply.applyCVData=newApplyCVData
        return this.applyRepository.save(newApply)

    }
}
