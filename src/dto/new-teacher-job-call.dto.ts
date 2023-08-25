import { IsObject } from "class-validator";
import { NewCareerClassDTO } from "./new-career-class.dto";
import { TeacherJobCallDTO } from "./teacher-job-call.dto";

export class NewTeacherJobCallDTO{

    @IsObject()
    teacherJobCall:TeacherJobCallDTO

    newCareerClass:NewCareerClassDTO[]
}