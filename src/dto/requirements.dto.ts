import { IsNotEmpty, IsString } from "class-validator";

export class RequirementsDTO{
   
    @IsNotEmpty()
    @IsString()
    description:string

   
    desiredLevel:string;

    
    yearsOfExperience:number;

   
    experienceType:string

  
    requirementType:string
}