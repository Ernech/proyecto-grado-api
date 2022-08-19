import { IsArray, IsDate,  IsNotEmpty, IsString } from "class-validator";
import { AcademicTrainingDTO } from "./academic-training.dto";
import { AptitudeDTO } from "./aptitude.dto";
import { ExperienceDTO } from "./experience.dto";
import { JobFunctionDTO } from "./job-function.dto";



export class JobCallDTO {

    @IsNotEmpty()
    @IsString()
    jobCallName: string;

    @IsNotEmpty()
    @IsString()
    jobCallNumber: string;

    @IsNotEmpty()
    @IsString()
    jobCallObj: string;

    @IsNotEmpty()
    @IsString()
    jobManualFile: string;

    @IsNotEmpty()
    @IsString()
    jobInfoFile: string;

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
}