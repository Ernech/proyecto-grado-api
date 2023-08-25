import { IsArray, IsNotEmptyObject } from "class-validator";
import { CVDataDTO } from "./cv-data.dto";
import { PersonalDataDTO } from "./personal-data.dto";


export class CVInfoDTO{

    @IsNotEmptyObject()
    personalData:PersonalDataDTO;

    @IsArray()
    cvData:CVDataDTO[];

}