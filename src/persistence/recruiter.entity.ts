import { Column, Entity } from "typeorm";
import { UserEntity } from "./user.entity";



@Entity('recruiter')
export class RecruiterEntity extends UserEntity{

    @Column({name:'recruiter_name',length:100})
    recruiterName:string;

    @Column({name:'recruiter_last_name',length:100})
    recruiterLastName:string;

    @Column({default:'RECRUITER',length:100})
    role:string

}