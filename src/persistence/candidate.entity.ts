import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";



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

}