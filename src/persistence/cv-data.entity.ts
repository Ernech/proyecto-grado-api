import { Column, Entity, JoinColumn, ManyToOne} from "typeorm";
import { BaseEntity } from "./base.entity";
import { CandidateEntity } from "./candidate.entity";

@Entity('cv_data')
export class CVDataEntity extends BaseEntity{

    @Column({name:'data_type',length:100})
    dataType:string;

    @Column({name:'title',length:300,default:'--'})
    title:string;

    @Column({name:'institution',length:300,default:'--'})
    institution:string;

    @Column({name:'position',length:300,default:'--'})
    position:string;

    @Column({name:'degree',length:300,default:'--'})
    degree:string;

    @Column({name:'degree_date',length:50,default:'--'})
    degreeDate:string;

    @Column({name:'location',length:250,default:'--'})
    location:string;

    @Column({name:'distinction_class',length:50,default:'--'})
    distinctionClass:string;

    @Column({name:'data_class',length:300,default:'--'})
    dataClass:string;

    @Column({name:'data_date',type:'date',nullable:true})
    dataDate:Date;

    @Column({name:'start_date',length:50,default:'--'})
    startDate:string;

    @Column({name:'finish_date',length:50,default:'--'})
    finishDate:string;

    @Column({name:'professional_title_file',type:'bytea',nullable:true})
    professionalTitleFile:Buffer;

    @Column({name:'professional_n_title_file',type:'bytea',nullable:true})
    professionalNTitleFile:Buffer;

    @Column({name:'professional_title_file_name',length:150,default:'--'})
    professionalTitleFileName:string;

    @Column({name:'professional_n_title_file_name',length:150,default:'--'})
    professionalNTitleFileName:string;

    @Column({name:'language',length:150,default:'--'})
    language:string;

    @Column({name:'writing',length:150,default:'--'})
    writing:string;

    @Column({name:'reading',length:150,default:'--'})
    reading:string;

    @Column({name:'speacking',length:150,default:'--'})
    speacking:string;

    @Column({name:'name',length:300,default:'--'})
    name:string;

    @Column({name:'employment_relationship',length:250,default:'--'})
    employmentRelationship:string;

    @Column({name:'phone',length:50,default:'--'})
    phone:string;

    @Column({name:'email',length:50,default:'--'})
    email:string;

    @Column({name:'address',length:50,default:'--'})
    address:string;

    @Column({name:'ucb_start_year',default:-1})
    ucbStartYear:number;

    @ManyToOne(()=>CandidateEntity,(candidate)=>candidate.cvData)
    @JoinColumn({name:'candidate_id'})
    candidate:CandidateEntity;


}