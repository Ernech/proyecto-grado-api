import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { JobCallEntity } from "./job-call.entity";


@Entity('aptitude')
export class AptitudeEntity extends BaseEntity{


    @Column({name:'aptitude',length:100})
    aptitude:string;

    @Column({name:'aptitude_type',length:100})
    aptitudeType:string;

    @Column({name:'desired_level',length:100})
    desiredLevel:string

    @JoinColumn({name:'job_call_id'})
    @ManyToOne(()=>JobCallEntity, (jobCall) => jobCall.aptitudes)
    jobCall:JobCallEntity

}