import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";



@Entity('recruiter')
export class RecruiterEntity extends BaseEntity{

    @Column({name:'name',length:150})
    name:string;

    @Column({name:'last_name',length:150})
    lastName:string;
    
    @Column({name:'position',length:150})
    position:string;


    @Column({name:'email',length:150})
    email:string;

    @Column({name:'password',length:150})
    password:string;

    @Column({default:'RECRUITER',length:150})
    role:string

}