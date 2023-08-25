import { type } from "os";
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { ApplyEntity } from "./apply.entity";
import { BaseEntity } from "./base.entity";
import { CandidateEntity } from "./candidate.entity";

@Entity('apply_personal_data')
export class ApplyPersonalDataEntity extends BaseEntity{

    @Column({name:'candidate_id',length:150, default:'--'})
    candidateId:string
    
    @Column({name:'first_last_name',length:150})
    firstLastName:string

    @Column({name:'second_last_name',length:150})
    secondLastName:string

    @Column({name:'name',length:150})
    name:string

    @Column({name:'married_last_name',length:150,nullable:true})
    marriedLastName:string

    @Column({name:'personal_id_number',length:150})
    personalIdNumber:string

    @Column({name:'issued',length:50})
    issued:string

    @Column({name:'id_type',length:50})
    idType:string

    @Column({name:'gender',length:50})
    gender:string

    @Column({name:'civil_status',length:100})
    civilStatus:string;

    @Column({name:'birth_date',type:'date'})
    birthDate:Date;

    @Column({name:'place_of_birth',length:150})
    placeOfBirth:string;

    @Column({name:'nationality',length:150})
    nationality:string;

    @Column({name:'address',length:300})
    address:string;

    @Column({name:'zone',length:300})
    zone:string;

    @Column({name:'afp',length:100,nullable:true})
    afp:string;

    @Column({name:'cua_number',length:100})
    cuaNumber:string;

    @Column({name:'home_phone',length:50})
    homePhone:string;

    @Column({name:'cell_phone',length:50})
    cellPhone:string;

    @Column({name:'email',length:150})
    email:string;

    @Column({name:'personal_id_file',type:'bytea',nullable:true})
    personalIdFile:Buffer;

    @Column({name:'personal_id_file_name',length:150,default:'--'})
    personalIdFileName:string;

    @Column({name:'teaching_start_year',default:-1,nullable:true})
    teachingStartYear:number;

    @Column({name:'teaching_ucb_start_year',default:-1,nullable:true})
    teachingUCBStartYear:number;

    @Column({name:'professional_start_year',default:-1,nullable:true})
    professionalStartYear:number;

    @Column({name:'teaching_title_file',type:'bytea',nullable:true})
    teachingTitleFile:Buffer;

    @Column({name:'teaching_title_file_name',length:150,default:'--'})
    teachingTitleFileName:string;

    @Column({name:'teaching_title_file_institution',length:300,default:'--'})
    teachingTitleFileInstitution:string;
    
    @Column({name:'teaching_plan_file',type:'bytea',nullable:true})
    teachingPlanFile:Buffer;

    @Column({name:'teaching_plan_file_name',length:300,default:'--'})
    teachingPlanFileName:string;


    @OneToOne(()=>ApplyEntity,(apply)=>apply.applyPersonalData)
    @JoinColumn({name:'apply_id'})
    apply:ApplyEntity;

    
}