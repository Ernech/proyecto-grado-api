import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { TokenService } from './token/token.service';
import { EncryptionService } from './encryption/encryption.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/persistence/user.entity';
import { DataBaseEnum } from 'src/persistence/enum/data-base.enum';
import { JobCallService } from './job-call/job-call.service';
import { JobCallEntity } from 'src/persistence/job-call.entity';
import { AcademicTrainingEntity } from 'src/persistence/academic-training.entity';
import { ExperienceEntity } from 'src/persistence/experience.entity';
import { AptitudeEntity } from 'src/persistence/aptitude.entity';
import { JobFunctionEntity } from 'src/persistence/job-function.entity';
import { RequiredKnowledgeEntity } from 'src/persistence/required-knowledge.entity';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity,JobCallEntity,AcademicTrainingEntity,ExperienceEntity,AptitudeEntity,JobFunctionEntity,RequiredKnowledgeEntity],DataBaseEnum.ORACLE)],
    providers:[UserService, TokenService, EncryptionService, JobCallService],exports:[UserService,TokenService,EncryptionService,JobCallService]})
export class ServiceModule {}
