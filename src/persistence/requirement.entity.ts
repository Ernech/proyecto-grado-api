import { Column, Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { TeacherJobCallEntity } from "./teacher-job-call.entity";

@Entity('requirement')
export class RequirementEntity extends BaseEntity{

    @Column({name:'desciption',length:300})
    description:string

    @Column({name:'desired_level',length:150,default:'--'})
    desiredLevel:string;

    @Column({name:'years_of_experience',default:-1})
    yearsOfExperience:number;

    @Column({name:'experience_type',length:150,default:'--'})
    experienceType:string

    @Column({name:'requirement_type',length:150,default:'--'})
    requirementType:string

    @ManyToOne(()=>TeacherJobCallEntity,(teacherJobCall)=>teacherJobCall.requirements)
    teacherJobCall:TeacherJobCallEntity
}