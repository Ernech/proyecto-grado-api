import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { JobCallEntity } from "./job-call.entity";

@Entity('experience')
export class ExperienceEntity extends BaseEntity{

    
    @Column({name:'years_of_experience'})
    yearsOfExperience:number;

    @Column({name:'requirement', length:300})
    requirement:string;

    @Column({name:'type',length:100})
    type:string;

    @JoinColumn({name:'job_call_id'})
    @ManyToOne(()=>JobCallEntity, (jobCall) => jobCall.experiences)
    jobCall:JobCallEntity
}