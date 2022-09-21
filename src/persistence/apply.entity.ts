import { Entity,Column, CreateDateColumn, ManyToOne, OneToMany, OneToOne, JoinColumn } from "typeorm";
import { ApplyCVDataEntity } from "./apply-cv-data.entity";
import { ApplyPersonalDataEntity } from "./apply-personal-data.entity";
import { BaseEntity } from "./base.entity";
import { CandidateEntity } from "./candidate.entity";
import { JobCallEntity } from "./job-call.entity";

@Entity('apply')
export class ApplyEntity extends BaseEntity{


    @ManyToOne(()=>CandidateEntity,(candidate)=>candidate.apply)
    candidate:CandidateEntity

    @ManyToOne(()=>JobCallEntity,(jobCall)=>jobCall.apply)
    jobCall:JobCallEntity

    @CreateDateColumn({ name: 'apply_date',
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP'})
    applyDate:Date;

    @Column({ name: 'apply_status',default:'PENDING'})
    applyStatus:string;

    @OneToOne(()=>ApplyPersonalDataEntity,(applyPersonalData)=>applyPersonalData.apply)
    @JoinColumn()
    applyPersonalData:ApplyPersonalDataEntity;

    @OneToMany(()=>ApplyCVDataEntity,(applyCVData)=>applyCVData.apply)
    applyCVData:ApplyCVDataEntity[]

    

}
