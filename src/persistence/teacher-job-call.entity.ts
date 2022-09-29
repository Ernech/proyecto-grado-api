import {  Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { CollegeClassEntity } from "./college-class.entity";
import { JobCallEntity } from "./job-call.entity";
import { RequirementEntity } from "./requirement.entity";

@Entity('teacher_job_call')
export class TeacherJobCallEntity extends BaseEntity{

    @Column({name:'required_number'})
    required_number:number;

    @Column({name:'job_call_code', length:25})
    jobCallCode:string;

    @ManyToOne(()=>JobCallEntity,(jobCall)=>jobCall.techerJobCalls)
    jobCall:JobCallEntity

    @ManyToOne(()=>CollegeClassEntity,(collegeClass)=>collegeClass.teacherJobCalls)
    collegeClass:CollegeClassEntity

    @OneToMany(()=>RequirementEntity,(requirement)=>requirement.teacherJobCall)
    requirements:RequirementEntity[]
}