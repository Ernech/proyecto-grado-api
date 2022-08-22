import { IsNotEmpty, IsString } from "class-validator"

export class RequiredKnowledgeDTO{

    @IsNotEmpty()
    @IsString()
    description:string

    @IsNotEmpty()
    @IsString()
    requiredLevel:string

    @IsNotEmpty()
    @IsString()
    required:string 
}