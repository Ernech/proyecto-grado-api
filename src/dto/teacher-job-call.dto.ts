import { IsDate,  IsNotEmpty, IsString } from "class-validator";



export class TeacherJobCallDTO {

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


}