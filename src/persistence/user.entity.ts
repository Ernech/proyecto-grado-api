import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";
import { RoleType } from "./enum/role-type.enum";


@Entity('user')
export class UserEntity extends BaseEntity{

    @Column({name:'email',length:100})
    email:string;

    @Column({name:'password',length:100})
    password:string;

    @Column({type:'enum',enum:RoleType,default:RoleType.RECRUITER})
    role:RoleType

}