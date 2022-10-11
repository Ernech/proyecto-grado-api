import { IsNotEmpty } from "class-validator";

export class CollegeCareerDTO{
    @IsNotEmpty()
    careerName:string
}