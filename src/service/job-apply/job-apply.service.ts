import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplyCVDataEntity } from 'src/persistence/apply-cv-data.entity';
import { ApplyPersonalDataEntity } from 'src/persistence/apply-personal-data.entity';
import { ApplyTCVDataEntity } from 'src/persistence/apply-t-cv-data.entity';
import { ApplyTPersonalDataEntity } from 'src/persistence/apply-t-personal-data.entity';
import { ApplyEntity } from 'src/persistence/apply.entity';
import { DataBaseEnum } from 'src/persistence/enum/data-base.enum';
import { TeacherApplyEntity } from 'src/persistence/teacher-apply.entity';
import { Repository } from 'typeorm';
import { CvService } from '../cv/cv.service';
import { JobCallService } from '../job-call/job-call.service';
import { UserService } from '../user/user.service';

@Injectable()
export class JobApplyService {

    constructor(private cvService:CvService, private jobCallService:JobCallService,private userService:UserService,
        @InjectRepository(ApplyEntity,DataBaseEnum.ORACLE) private applyRepository:Repository<ApplyEntity>,
        @InjectRepository(ApplyPersonalDataEntity,DataBaseEnum.ORACLE) private applyPersonalDataRepository:Repository<ApplyPersonalDataEntity>,
        @InjectRepository(ApplyCVDataEntity,DataBaseEnum.ORACLE) private applyCVDataRepository:Repository<ApplyCVDataEntity>,
        @InjectRepository(TeacherApplyEntity,DataBaseEnum.ORACLE) private teacherApplyRepository:Repository<TeacherApplyEntity>,
        @InjectRepository(ApplyTPersonalDataEntity,DataBaseEnum.ORACLE) private applyTPersonalDataRepository:Repository<ApplyTPersonalDataEntity>,
        @InjectRepository(ApplyTCVDataEntity,DataBaseEnum.ORACLE) private applyTCVDataRepository:Repository<ApplyTCVDataEntity>){}


    async newJobApply(candidateId:string,jobCallId:string){
        const newApply:ApplyEntity = new ApplyEntity();
        const {personalData,cvData} = await this.cvService.getCVByCandidateId(candidateId)
        const jobcall =  await this.jobCallService.getJobCallById(jobCallId)
        const candiate = await this.userService.getCandidateById(candidateId)
        const newApplyPersonalData:ApplyPersonalDataEntity=this.applyPersonalDataRepository.create(personalData)
        newApplyPersonalData.candidateId=candidateId
        const newApplyCVData:ApplyCVDataEntity[]=this.applyCVDataRepository.create(cvData)
        newApplyCVData.forEach(obj=>obj.candidateId=candidateId)
        newApply.candidate=candiate,
        newApply.jobCall=jobcall,
        newApply.applyPersonalData=newApplyPersonalData,
        newApply.applyCVData=newApplyCVData
        return this.applyRepository.save(newApply)

    }

    async newTeacherJobApply(candidateId:string,teacherJobCallId:string){
        const newTeacherApply:TeacherApplyEntity = new TeacherApplyEntity();
        const {personalData,cvData} = await this.cvService.getCVByCandidateId(candidateId)
        const jobcall =  await this.jobCallService.getTeacherJobCallEntityById(teacherJobCallId)
        const candiate = await this.userService.getCandidateById(candidateId)
        const newApplyPersonalData:ApplyTPersonalDataEntity=this.applyTPersonalDataRepository.create(personalData)
        newApplyPersonalData.candidateId=candidateId
        const newApplyTCVData:ApplyTCVDataEntity[]=this.applyTCVDataRepository.create(cvData)
        newApplyTCVData.forEach(obj=>obj.candidateId=candidateId)
        newTeacherApply.candidate=candiate,
        newTeacherApply.teacherJobCall=jobcall,
        newTeacherApply.applyTPersonalData=newApplyPersonalData,
        newTeacherApply.applyTCVData=newApplyTCVData
        return this.teacherApplyRepository.save(newTeacherApply)

    }
}
