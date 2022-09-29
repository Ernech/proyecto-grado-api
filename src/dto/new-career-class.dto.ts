import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID } from "class-validator";
import { RequirementsDTO } from "./requirements.dto";

export class NewCareerClassDTO{

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    id:string;

    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    requiredNumber:number;

    @IsNotEmpty()
    @IsArray()
    requirements:RequirementsDTO[]

}