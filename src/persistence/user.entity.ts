import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";



@Entity('user')
export class UserEntity extends BaseEntity{

    @Column({name:'email',length:100})
    email:string;

    @Column({name:'password',length:100})
    password:string;

    @Column({default:'RECRUITER',length:100})
    role:string

}