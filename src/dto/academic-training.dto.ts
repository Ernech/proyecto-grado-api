import { IsNotEmpty } from "class-validator";


export class AcademicTrainingDTO{

    @IsNotEmpty()
    training:string;
}