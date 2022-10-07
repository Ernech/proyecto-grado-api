import { Entity,Column, CreateDateColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { ApplyCVDataEntity } from "./apply-cv-data.entity";
import { ApplyPersonalDataEntity } from "./apply-personal-data.entity";
import { ApplyTCVDataEntity } from "./apply-t-cv-data.entity";
import { ApplyTPersonalDataEntity } from "./apply-t-personal-data.entity";
import { BaseEntity } from "./base.entity";
import { CandidateEntity } from "./candidate.entity";
import { JobCallEntity } from "./job-call.entity";

@Entity('teacher_apply')
export class TeacherApplyEntity extends BaseEntity{


    @ManyToOne(()=>CandidateEntity,(candidate)=>candidate.teacherApply)
    candidate:CandidateEntity

    @ManyToOne(()=>JobCallEntity,(jobCall)=>jobCall.apply)
    jobCall:JobCallEntity

    @CreateDateColumn({ name: 'apply_date',
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP'})
    applyDate:Date;

    @Column({ name: 'apply_status',default:'PENDING'})
    applyStatus:string;

    @OneToOne(()=>ApplyTPersonalDataEntity,(applyTPersonalData)=>applyTPersonalData.teacherApply,{cascade:true})
    applyTPersonalData:ApplyTPersonalDataEntity;

    @OneToMany(()=>ApplyTCVDataEntity,(applyTCVData)=>applyTCVData.teacherApply,{cascade:true})
    applyTCVData:ApplyTCVDataEntity[]

    

}
