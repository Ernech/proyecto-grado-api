import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { CollegeClassEntity } from "./college-class.entity";

@Entity('college_career')
export class CollegeCareerEntity extends BaseEntity{

    @Column({name:'career_name',length:300})
    careerName:string

    @OneToMany(()=>CollegeClassEntity,(collegeClassEntity)=>collegeClassEntity.collegeCareer)
    collegeClass:CollegeClassEntity[]

}