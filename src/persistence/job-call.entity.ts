import { Column, Entity, OneToMany } from "typeorm";
import { AcademicTrainingEntity } from "./academic-training.entity";
import { ApplyEntity } from "./apply.entity";
import { AptitudeEntity } from "./aptitude.entity";
import { BaseEntity } from "./base.entity";
import { ExperienceEntity } from "./experience.entity";
import { JobFunctionEntity } from "./job-function.entity";
import { RequiredKnowledgeEntity } from "./required-knowledge.entity";
import { TeacherJobCallEntity } from "./teacher-job-call.entity";

@Entity('job_call')
export class JobCallEntity extends BaseEntity{

    @Column({name:'job_call_name', length:300})
    jobCallName:string;

    @Column({name:'job_call_number', length:300})
    jobCallNumber:string;

    @Column({name:'job_call_obj',length:400,default:'--'})
    jobCallObj:string;

    @Column({name:'job_manual_file', type:'bytea',nullable:true})
    jobManualFile:Buffer;

    @Column({name:'job_manual_file_name', length:50 ,default:'--'})
    jobManualFileName:string;
    
    @Column({name:'job_call_status', length:300})
    jobCallStatus: string;

    @Column({name:'position', length:300,nullable:true})
    position:string

    @Column({name:'opening_date',type:'timestamp'})
    openingDate: Date;

    
    @Column({name:'closing_date', type:'timestamp'})
    closingDate: Date;

    @OneToMany(()=> JobFunctionEntity, (jobFunctions)=> jobFunctions.jobCall,{cascade:true})
    jobFunctions: JobFunctionEntity[]

    @OneToMany(()=> ExperienceEntity, (experience)=> experience.jobCall,{cascade:true})
    experiences: ExperienceEntity[]

    @OneToMany(()=> AcademicTrainingEntity, (academicTraining)=> academicTraining.jobCall,{cascade:true})
    academicTrainings: AcademicTrainingEntity[]

    @OneToMany(()=> RequiredKnowledgeEntity, (requiredKnowledge)=> requiredKnowledge.jobCall,{cascade:true})
    requiredKnowledge: RequiredKnowledgeEntity[]
   
    @OneToMany(()=> AptitudeEntity, (aptitude)=> aptitude.jobCall,{cascade:true})
    aptitudes: AptitudeEntity[]

    @OneToMany(()=> TeacherJobCallEntity, (teacherJobCall)=> teacherJobCall.jobCall,{cascade:true})
    teacherJobCalls: TeacherJobCallEntity[]

    @OneToMany(()=>ApplyEntity,(apply)=>apply.jobCall)
    apply:ApplyEntity[];
}