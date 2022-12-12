import { Injectable } from '@nestjs/common';
import { ApplyTCVDataEntity } from 'src/persistence/apply-t-cv-data.entity';
import { ApplyTPersonalDataEntity } from 'src/persistence/apply-t-personal-data.entity';
import { catchError, firstValueFrom, map } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { AcademicParamsDTO } from 'src/dto/academic-params.dto';

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
    async hasParam(param: string) {
        const data = await firstValueFrom(this.httpService.post('http://127.0.0.1:5000/params', { "param": param })
            .pipe(map(resp => resp.data)));
        return data
    }

    async academicTrainingParams(applyTCVDataArray: ApplyTCVDataEntity[]): Promise<AcademicParamsDTO> {
        //Licenciatura

        const mainTitle: ApplyTCVDataEntity = applyTCVDataArray.find(obj => obj.dataType == 'ACADEMIC_TRAINING' && obj.degree === 'Licenciatura')
        if (mainTitle) {
            const data = await firstValueFrom(this.httpService.post('http://127.0.0.1:5000/params', { "param": mainTitle.title })
                .pipe(map(resp => {
                    let hasAcademicTraining: number = 0
                    let academicTitleIndexed: number = 0
                    let academicNTitleIndexed: number = 0
                    let hasProfessionalTimeExperience: number = 0
                    if (resp.data.length > 0) {
                        hasAcademicTraining = 1
                        academicTitleIndexed = mainTitle.professionalTitleFile ? 1 : 0
                        academicNTitleIndexed = mainTitle.professionalTitleFile ? 1 : 0
                        hasProfessionalTimeExperience = this.getExperienceTime(mainTitle.degreeDate) >= 3 ? 1 : 0
                    }
                    return {
                        hasAcademicTraining,
                        academicTitleIndexed,
                        academicNTitleIndexed,
                        hasProfessionalTimeExperience
                    }
                })));
            return data
        }
        return { hasAcademicTraining: 0, academicTitleIndexed: 0, academicNTitleIndexed: 0, hasProfessionalTimeExperience: 0 }
    }

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

    teachingPlanIndexed(applyPersonalTData: ApplyTPersonalDataEntity): number {
        return applyPersonalTData.teachingPlanFile ? 1 : 0
    }

    hasPostgrade(applyTCVDataArray: ApplyTCVDataEntity[]) {
        const secondTitles = applyTCVDataArray.filter(async obj => {
            const param = await this.hasParam(obj.title)
            if (param.length > 0) {
                return obj
            }
        })
        return secondTitles

    }

    getRequiredKnowledges(applyTCVDataArray: ApplyTCVDataEntity[]) {
        const requiredKnowledges =  applyTCVDataArray.map(async obj => {
            if (obj.dataType === 'ACADEMIC_TRAINING' ) {
                const param = await this.hasParam(obj.title)
                if (param.length > 0) {
                    return obj.title
                }
            }
            else if(obj.dataType==='LANGUAGE'){
                const param = await this.hasParam(obj.language)
                if (param.length > 0) {
                    return obj.language
                }
            }
        })

        let getRequiredKnowledgesString =''
        if(requiredKnowledges.length<1){
            return getRequiredKnowledgesString
        }

        for(let i = 0;i<requiredKnowledges.length;i++){
            getRequiredKnowledgesString += '-' + requiredKnowledges[i] +'\n'
        }
        return getRequiredKnowledgesString

    }

    async hasAcademicTraining(applyTCVDataArray: ApplyTCVDataEntity[]): Promise<number> {


        const mainTitle: ApplyTCVDataEntity = applyTCVDataArray.find(obj => obj.dataType == 'ACADEMIC_TRAINING' && obj.degree === 'Licenciatura')
        if (mainTitle) {
            const data = await firstValueFrom(this.httpService.post('http://127.0.0.1:5000/params', { "param": mainTitle.title })
                .pipe(map(resp => resp.data)));
            if (data.length > 0) {

                return 1
            }
            return 0
        }
        return 0
    }

    async hasProfessionalTimeExperience(applyTCVDataArray: ApplyTCVDataEntity[]): Promise<number> {
        const mainTitle: ApplyTCVDataEntity = applyTCVDataArray.find(obj => obj.dataType == 'ACADEMIC_TRAINING' && obj.degree === 'Licenciatura')
        if (mainTitle) {
            const data = await firstValueFrom(this.httpService.post('http://127.0.0.1:5000/params', { "param": mainTitle.title })
                .pipe(map(resp => resp.data)));
            if (data.length > 0) {
                if (this.getExperienceTime(mainTitle.degreeDate) >= 3) {
                    return 1
                }
                return 0
            }
            return 0
        }
    }
    hasTeachingExperience(applyTPersonalData: ApplyTPersonalDataEntity): number {
        if (applyTPersonalData.teachingStartYear) {
            if (this.getExperienceTime(applyTPersonalData.teachingStartYear.toString()) >= 2) {
                return 1
            }
            return 0
        }
    }

    getExperienceTime(degreeDate: string): number {

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
    calculateAge(birthDate: string): number {
        const ageDifMs = Date.now() - new Date(birthDate).getTime();
        const ageDate = new Date(ageDifMs);
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    getProfessionalExperienceTime(degreeDate: string): string {

        let df = new Date(degreeDate);
        let dt = new Date();
        let allYears = dt.getFullYear() - df.getFullYear();
        let partialMonths = dt.getMonth() - df.getMonth();
        if (partialMonths < 0) {
            allYears--;
            partialMonths = partialMonths + 12;
        }
        let total = allYears + " años " + partialMonths + " meses";
        return total
    }
    getTeachingExperienceTime(teachingYears: string): string {
        let df = new Date(teachingYears + '');
        let dt = new Date();
        let allYears = dt.getFullYear() - df.getFullYear();
        let partialMonths = dt.getMonth() - df.getMonth();
        if (partialMonths < 0) {
            allYears--;
            partialMonths = partialMonths + 12;
        }
        let total = allYears + " años";

        return `(${teachingYears}) ${total}`
    }

}
