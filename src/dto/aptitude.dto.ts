import { IsNotEmpty, IsString } from "class-validator";

export class AptitudeDTO{

    @IsNotEmpty()
    @IsString()
    aptitude:string;

    @IsString()
    @IsString()
    aptitudeType:string;

    @IsNotEmpty()
    @IsString()
    desiredLevel:string
}
