import { IsArray, IsDate,  IsNotEmpty, IsString } from "class-validator";
import { AcademicTrainingDTO } from "./academic-training.dto";
import { AptitudeDTO } from "./aptitude.dto";
import { ExperienceDTO } from "./experience.dto";
import { JobFunctionDTO } from "./job-function.dto";
import { RequiredKnowledgeDTO } from "./required-knowledge.dto";



export class JobCallDTO {

    @IsNotEmpty()
    @IsString()
    jobCallName: string;

    @IsNotEmpty()
    @IsString()
    jobCallNumber: string;

    @IsNotEmpty()
    jobCallObj: Buffer;

    @IsNotEmpty()
    @IsString()
    jobManualFile: string;

    @IsNotEmpty()
    @IsDate()
    openingDate: Date;


    @IsNotEmpty()
    @IsDate()
    closingDate: Date;

    @IsNotEmpty()
    @IsArray()
    jobFunctions: JobFunctionDTO[]

    @IsNotEmpty()
    @IsArray()
    experiences: ExperienceDTO[]

    @IsNotEmpty()
    @IsArray()
    academicTrainings: AcademicTrainingDTO[]

    @IsNotEmpty()
    @IsArray()
    aptitudes: AptitudeDTO[]

    @IsNotEmpty()
    @IsArray()
    requiredKnowledge:RequiredKnowledgeDTO[]
}