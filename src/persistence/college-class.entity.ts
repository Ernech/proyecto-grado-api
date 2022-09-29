import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { CollegeCareerEntity } from "./college-carrer.entity";
import { TeacherJobCallEntity } from "./teacher-job-call.entity";

@Entity('college_class')
export class CollegeClassEntity extends BaseEntity{

    @Column({name:'code',length:50})
    code:string

    @Column({name:'name',length:300})
    name:string

    @ManyToOne(()=>CollegeCareerEntity,(collegeCareerEntity)=>collegeCareerEntity.collegeClass)
    collegeCareer:CollegeCareerEntity
    
    @OneToMany(()=> TeacherJobCallEntity, (teacherJobCall)=> teacherJobCall.collegeClass,{cascade:true})
    teacherJobCalls: TeacherJobCallEntity[]
}