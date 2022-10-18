import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CVInfoDTO } from 'src/dto/cv-info.dto';
import { CandidateEntity } from 'src/persistence/candidate.entity';
import { CVDataEntity } from 'src/persistence/cv-data.entity';
import { DataBaseEnum } from 'src/persistence/enum/data-base.enum';
import { PersonalDataEntity } from 'src/persistence/personal-data.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class CvService {

    constructor(@InjectRepository(CandidateEntity, DataBaseEnum.ORACLE) private candidateRepository: Repository<CandidateEntity>,
        @InjectRepository(PersonalDataEntity, DataBaseEnum.ORACLE) private personalDataRepository: Repository<PersonalDataEntity>,
        @InjectRepository(CVDataEntity, DataBaseEnum.ORACLE) private cvDataRepository: Repository<CVDataEntity>,
        private userService: UserService) { }


    async saveCV(candidateId: string, cvInfoDTO: CVInfoDTO) {
        const candidate = await this.userService.getCandidateById(candidateId)
        const newPersonalData: PersonalDataEntity = this.personalDataRepository.create(cvInfoDTO.personalData)
        const newCVDataArray: CVDataEntity[] = this.cvDataRepository.create(cvInfoDTO.cvData)
        candidate.personalData = newPersonalData
        candidate.cvData = newCVDataArray
        return await this.candidateRepository.save(candidate)
    }

    async editCV(candidateId: string, cvInfoDTO: CVInfoDTO) {
        const candidate = await this.userService.getCandidateById(candidateId)
        const candiateUpdated = candidate
        const newPersonalData = this.personalDataRepository.create(cvInfoDTO.personalData)
        const newCVData = this.cvDataRepository.create(cvInfoDTO.cvData)
        candiateUpdated.personalData = newPersonalData
        candiateUpdated.cvData = newCVData
        this.candidateRepository.merge(candidate, candiateUpdated)
        return await this.candidateRepository.save(candidate)
    }


    async getCVByCandidateId(candiateId: string) {
        const personalData: PersonalDataEntity = await this.personalDataRepository.createQueryBuilder('personalData')
            .select([
                'personalData.firstLastName',
                'personalData.secondLastName',
                'personalData.name',
                'personalData.marriedLastName',
                'personalData.personalIdNumber',
                'personalData.issued',
                'personalData.idType',
                'personalData.gender',
                'personalData.civilStatus',
                'personalData.birthDate',
                'personalData.placeOfBirth',
                'personalData.nationality',
                'personalData.address',
                'personalData.zone',
                'personalData.afp',
                'personalData.cuaNumber',
                'personalData.homePhone',
                'personalData.cellPhone',
                'personalData.email',
                'personalData.personalIdFile',
                'personalData.professionalStartYear'

            ]).innerJoinAndSelect('personalData.candidate', 'candidate')
            .where('candidate.id=:id', { id: candiateId })
            .andWhere('candidate.status=:status', { status: 1 })
            .andWhere('personalData.status=:status', { status: 1 })
            .getOne();
        const cvData: CVDataEntity[] = await this.cvDataRepository.createQueryBuilder('cvData').select([
            'cvData.dataType',
            'cvData.title',
            'cvData.institution',
            'cvData.position',
            'cvData.degree',
            'cvData.degreeDate',
            'cvData.location',
            'cvData.distinctionClass',
            'cvData.dataClass',
            'cvData.dataDate',
            'cvData.startDate',
            'cvData.finishDate',
            'cvData.techingStartYear',
            'cvData.teachingUCBStartYear',
            'cvData.professionalTitleFile',
            'cvData.professionalNTitleFile',
            'cvData.language',
            'cvData.writing',
            'cvData.reading',
            'cvData.speacking',
            'cvData.name',
            'cvData.employmentRelationship',
            'cvData.phone',
            'cvData.email',
            'cvData.address',
        ]).innerJoinAndSelect('cvData.candidate', 'candidate')
            .where('candidate.id=:id', { id: candiateId })
            .andWhere('candidate.status=:status', { status: 1 })
            .andWhere('cvData.status=:status', { status: 1 })
            .getMany();

        return { personalData, cvData }
    }



}
