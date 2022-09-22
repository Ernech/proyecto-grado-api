import { IsNotEmpty, IsString, IsUUID } from "class-validator";


export  class ApplyDTO {

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    candidateId:string

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    jobCallId:string
}