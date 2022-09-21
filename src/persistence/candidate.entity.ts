import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { CVDataEntity } from "./cv-data.entity";
import { PersonalDataEntity } from "./personal-data.entity";



@Entity('candidate')
export class CandidateEntity extends BaseEntity{

    @Column({name:'name',length:100})
    name:string;

    @Column({name:'last_name',length:100})
    lastName:string;

    @Column({name:'email',length:100})
    email:string;

    @Column({name:'password',length:100})
    password:string;

    @Column({default:'CANDIDATE',length:100})
    role:string

    @OneToOne(()=>PersonalDataEntity,(personalData)=>personalData.candidate)
    @JoinColumn()
    personalData:PersonalDataEntity;

    @OneToMany(()=> CVDataEntity, (cvData)=> cvData.candidate,{cascade:true})
    cvData: CVDataEntity[]

}