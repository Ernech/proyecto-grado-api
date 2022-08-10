import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export class BaseEntity {

    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({name:'status',default:1})
    status: number;

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp', 
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt: Date;
    @CreateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate:'CURRENT_TIMESTAMP'
    })
    updatedAt: Date;
}