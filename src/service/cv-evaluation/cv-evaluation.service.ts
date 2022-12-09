import { Injectable } from '@nestjs/common';
import { ApplyTCVDataEntity } from 'src/persistence/apply-t-cv-data.entity';
import { ApplyTPersonalDataEntity } from 'src/persistence/apply-t-personal-data.entity';
import { RequirementEntity } from 'src/persistence/requirement.entity';
import { TeacherApplyEntity } from 'src/persistence/teacher-apply.entity';
import { TeacherJobCallEntity } from 'src/persistence/teacher-job-call.entity';
import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CvEvaluationService {


    teachingContentIndexed():number{
        return 0
    }

    academicTitleIndexed(applyTCVDataArray:ApplyTCVDataEntity[],requirementsArray:RequirementEntity[]):number{
        //Licenciatura
        const academicTrainings = requirementsArray.filter(obj=>obj.requirementType=='ACADEMIC_TRAINING' || obj.description.toLowerCase().search('licenciatura'))
        if(academicTrainings.length>0){

        }

        return 0
    }
    academicNTitleIndexed():number{
        return 0
    }
    personalIdIndexed(applyTPersonalData:ApplyTPersonalDataEntity):number{
        return applyTPersonalData.personalIdFile ? 1 : 0
    }

    teachingTitleIndexed(applyPersonalTData:ApplyTPersonalDataEntity):number{
        return applyPersonalTData.teachingTitleFile ? 1: 0
    }

    hasAcademicTraining(applyTCVDataArray:ApplyTCVDataEntity[],requirementsArray:RequirementEntity[]):number{
        

        //Licenciatura
        const mainAcademicTraining = requirementsArray.find(obj=>obj.requirementType=='ACADEMIC_TRAINING' && obj.description.toLowerCase().search('licenciatura'))
        //Licenciatura en derecho
        const mainAcademicTitle = applyTCVDataArray.find(obj=>obj.dataType=='ACADEMIC_TRAINING' && obj.degree===('Licenciatura'))
        if(mainAcademicTraining){
            
        }
        return 0
    }

    hasProfessionalExperience(teacherApply:TeacherApplyEntity,teacherJobCallEntity:TeacherJobCallEntity):number{
        return 0
    }
    hasTeachingExperience():number{
        return 0
    }

    getProfessionalExperienceTime(applyTCVData:ApplyTCVDataEntity):number {
        if (!applyTCVData) {
            return 0
        }
        let df = new Date(applyTCVData.degreeDate);
        let dt = new Date();
        let allYears = dt.getFullYear() - df.getFullYear();
        let partialMonths = dt.getMonth() - df.getMonth();
        if (partialMonths < 0) {
            allYears--;
            partialMonths = partialMonths + 12;
        }
        let total = allYears 
        return total
    }

}
