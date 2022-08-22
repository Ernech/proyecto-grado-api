import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { JobCallEntity } from "./job-call.entity";

@Entity('academic_training')
export class AcademicTrainingEntity extends BaseEntity{

    @Column({name:'training',length:400})
    training:string;

    @JoinColumn({name:'job_call_id'})
    @ManyToOne(()=>JobCallEntity, (jobCall) => jobCall.academicTrainings)
    jobCall:JobCallEntity
}