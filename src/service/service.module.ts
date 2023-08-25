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
import { JobApplyService } from './job-apply/job-apply.service';
import { ApplyEntity } from 'src/persistence/apply.entity';
import { ApplyCVDataEntity } from 'src/persistence/apply-cv-data.entity';
import { ApplyPersonalDataEntity } from 'src/persistence/apply-personal-data.entity';
import { CollegeCareerEntity } from 'src/persistence/college-carrer.entity';
import { CollegeClassEntity } from 'src/persistence/college-class.entity';
import { RequirementEntity } from 'src/persistence/requirement.entity';
import { TeacherJobCallEntity } from 'src/persistence/teacher-job-call.entity';
import { CollegeClassService } from './college-class/college-class.service';
import { TeacherApplyEntity } from 'src/persistence/teacher-apply.entity';
import { ApplyTCVDataEntity } from 'src/persistence/apply-t-cv-data.entity';
import { ApplyTPersonalDataEntity } from 'src/persistence/apply-t-personal-data.entity';
import { HttpModule } from '@nestjs/axios';
import { HttpService } from '@nestjs/axios/dist';
import { CvEvaluationService } from './cv-evaluation/cv-evaluation.service';

@Module({
    imports: [TypeOrmModule.forFeature([
        RecruiterEntity,
        CandidateEntity,
        JobCallEntity,
        AcademicTrainingEntity,
        ExperienceEntity,
        AptitudeEntity,
        JobFunctionEntity,
        RequiredKnowledgeEntity,
        PersonalDataEntity,
        CVDataEntity,
        ApplyEntity,
        ApplyCVDataEntity,
        ApplyPersonalDataEntity,
        CollegeCareerEntity,
        CollegeClassEntity,
        RequirementEntity,
        TeacherJobCallEntity,
        TeacherApplyEntity,
        ApplyTCVDataEntity,
        ApplyTPersonalDataEntity, ], DataBaseEnum.ORACLE),HttpModule],
    providers: [UserService, TokenService, EncryptionService, JobCallService, CvService, JobApplyService, CollegeClassService, CvEvaluationService]
    , exports: [UserService, TokenService, EncryptionService, JobCallService, CvService, JobApplyService, CollegeClassService]
})
export class ServiceModule { }
