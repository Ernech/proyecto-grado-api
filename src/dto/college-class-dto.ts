import { IsNotEmpty, IsString } from "class-validator"

export class CollegeClassDTO{
    @IsNotEmpty()
    @IsString()
    code:string

    @IsNotEmpty()
    @IsString()
    name:string
}