import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { TokenService } from './token/token.service';
import { EncryptionService } from './encryption/encryption.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecruiterEntity } from 'src/persistence/recruiter.entity';
import { DataBaseEnum } from 'src/persistence/enum/data-base.enum';
import { JobCallService } from './job-call/job-call.service';
import { JobCallEntity } from 'src/persistence/job-call.entity';
import { AcademicTrainingEntity } from 'src/persistence/academic-training.entity';
import { ExperienceEntity } from 'src/persistence/experience.entity';
import { AptitudeEntity } from 'src/persistence/aptitude.entity';
import { JobFunctionEntity } from 'src/persistence/job-function.entity';
import { RequiredKnowledgeEntity } from 'src/persistence/required-knowledge.entity';
import { CandidateEntity } from 'src/persistence/candidate.entity';
import { PersonalDataEntity } from 'src/persistence/personal-data.entity';
import { CVDataEntity } from 'src/persistence/cv-data.entity';
import { CvService } from './cv/cv.service';

@Module({
    imports: [TypeOrmModule.forFeature([RecruiterEntity, CandidateEntity, JobCallEntity, AcademicTrainingEntity, ExperienceEntity, AptitudeEntity, JobFunctionEntity, RequiredKnowledgeEntity, PersonalDataEntity, CVDataEntity], DataBaseEnum.ORACLE)],
    providers: [UserService, TokenService, EncryptionService, JobCallService, CvService]
    , exports: [UserService, TokenService, EncryptionService, JobCallService, CvService]
})
export class ServiceModule { }
