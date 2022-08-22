import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { JobCallEntity } from "./job-call.entity";

@Entity('required-knowledge')
export class RequiredKnowledgeEntity extends BaseEntity {

    @Column({ name: 'description', length: 300 })
    description: string

    @Column({ name: 'required-level', length: 300 })
    requiredLevel: string

    @Column({ name: 'required', length: 300 })
    required: string

    @JoinColumn({ name: 'job_call_id' })
    @ManyToOne(() => JobCallEntity, (jobCall) => jobCall.jobFunctions)
    jobCall: JobCallEntity
} 