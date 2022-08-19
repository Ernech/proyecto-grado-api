import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { JobCallEntity } from "./job-call.entity";


@Entity('job_function')
export class JobFunctionEntity extends BaseEntity{

 @Column({name:'job_function',length:300})
 jobFunction:string;

 @JoinColumn({name:'job_call_id'})
 @ManyToOne(()=>JobCallEntity, (jobCall) => jobCall.jobFunctions)
 jobCall:JobCallEntity

}