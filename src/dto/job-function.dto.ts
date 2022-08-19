import { IsNotEmpty, IsString } from "class-validator";


export class JobFunctionDTO{

    @IsNotEmpty()
    @IsString()
    jobFunction:string;
}