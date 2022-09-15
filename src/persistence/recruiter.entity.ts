import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";



@Entity('recuiter')
export class RecruiterEntity extends BaseEntity{

    @Column({name:'name',length:100})
    name:string;

    @Column({name:'last_name',length:100})
    lastName:string;
    
    @Column({name:'position',length:100})
    position:string;

    @Column({name:'email',length:100})
    email:string;

    @Column({name:'password',length:100})
    password:string;

    @Column({default:'RECRUITER',length:100})
    role:string

}