import { Injectable } from '@nestjs/common';
import { ApplyTCVDataEntity } from 'src/persistence/apply-t-cv-data.entity';
import { ApplyTPersonalDataEntity } from 'src/persistence/apply-t-personal-data.entity';
import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CvEvaluationService {

    constructor(private readonly httpService: HttpService) { }

    teachingContentIndexed(): number {
        return 0
    }

    async academicTitleIndexed(applyTCVDataArray: ApplyTCVDataEntity[]): Promise<number> {
        //Licenciatura
        const mainTitle: ApplyTCVDataEntity = applyTCVDataArray.find(obj => obj.dataType == 'ACADEMIC_TRAINING' && obj.degree === 'Licenciatura')
        if (mainTitle) {
            const data = await firstValueFrom(this.httpService.post('http://127.0.0.1:5000/params', { "param": mainTitle.title })
                .pipe(map(resp => resp.data)));
            if (data.length > 0) {
                return mainTitle.professionalTitleFile ? 1 : 0
            }
            return 0
        }
    }

    // async academicTrainingParams(applyTCVDataArray: ApplyTCVDataEntity[]): Promise<object> {
    //     //Licenciatura
        
    //     const mainTitle: ApplyTCVDataEntity = applyTCVDataArray.find(obj => obj.dataType == 'ACADEMIC_TRAINING' && obj.degree === 'Licenciatura')
    //     if (mainTitle) {
    //         const data = await firstValueFrom(this.httpService.post('http://127.0.0.1:5000/params', { "param": mainTitle.title })
    //             .pipe(map(resp => resp.data)));
    //         if (data.length > 0) {
    //         }
    //     }
    //     return {}
    // }

    async academicNTitleIndexed(applyTCVDataArray: ApplyTCVDataEntity[]): Promise<number> {
        const mainTitle: ApplyTCVDataEntity = applyTCVDataArray.find(obj => obj.dataType == 'ACADEMIC_TRAINING' && obj.degree === 'Licenciatura')
        if (mainTitle) {
            const data = await firstValueFrom(this.httpService.post('http://127.0.0.1:5000/params', { "param": mainTitle.title })
                .pipe(map(resp => resp.data)));
            if (data.length > 0) {
                return mainTitle.professionalTitleFile ? 1 : 0
            }
            return 0
        }
    }
    personalIdIndexed(applyTPersonalData: ApplyTPersonalDataEntity): number {
        return applyTPersonalData.personalIdFile ? 1 : 0
    }

    teachingTitleIndexed(applyPersonalTData: ApplyTPersonalDataEntity): number {
        return applyPersonalTData.teachingTitleFile ? 1 : 0
    }

   async  hasAcademicTraining(applyTCVDataArray: ApplyTCVDataEntity[]):Promise<number> {


        const mainTitle: ApplyTCVDataEntity = applyTCVDataArray.find(obj => obj.dataType == 'ACADEMIC_TRAINING' && obj.degree === 'Licenciatura')
        if (mainTitle) {
            return 1
        }
        return 0
    }

  async  hasProfessionalTimeExperience(applyTCVDataArray: ApplyTCVDataEntity[]): Promise<number> {
        const mainTitle: ApplyTCVDataEntity = applyTCVDataArray.find(obj => obj.dataType == 'ACADEMIC_TRAINING' && obj.degree === 'Licenciatura')
        if (mainTitle) {
            const data = await firstValueFrom(this.httpService.post('http://127.0.0.1:5000/params', { "param": mainTitle.title })
                .pipe(map(resp => resp.data)));
            if (data.length > 0) {
                if(this.getExperienceTime(mainTitle.degreeDate)>=3){
                    return 1
                    
                }
                return 0
            }
            return 0
        }
    }
    hasTeachingExperience(applyTPersonalData:ApplyTPersonalDataEntity): number {
        if(applyTPersonalData.teachingStartYear){
            if(this.getExperienceTime(applyTPersonalData.teachingStartYear.toString())>=2){
                return 1
        }
        return 0
    }
}

    getExperienceTime(degreeDate:string): number {
       
        let df = new Date(degreeDate);
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
