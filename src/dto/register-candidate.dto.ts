import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterCandidateDTO{
   
   
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    lastName:string;


    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email:string;

    @IsNotEmpty()
    @IsString()
    password:string
}