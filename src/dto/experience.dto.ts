import { IsInt, IsNotEmpty, IsString } from "class-validator";


export class ExperienceDTO{

    @IsNotEmpty()
    @IsInt()
    yearsOfExperience:number;

    @IsNotEmpty()
    @IsString()
    description:string;

   @IsNotEmpty()
   @IsString()
    requirement:string;

    @IsNotEmpty()
    @IsString()
    type:string;


}