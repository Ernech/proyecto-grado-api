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

    constructor(@InjectRepository(CandidateEntity,DataBaseEnum.ORACLE) private candidateRepository:Repository<CandidateEntity>,
    @InjectRepository(PersonalDataEntity,DataBaseEnum.ORACLE) private personalDataRepository:Repository<PersonalDataEntity>,
    @InjectRepository(CVDataEntity,DataBaseEnum.ORACLE) private cvDataRepository:Repository<CVDataEntity>,
    private userService:UserService){}


    async saveCV(candidateId:string,cvInfoDTO:CVInfoDTO){
        const candidate = await this.userService.getCandidateById(candidateId) 
        const newPersonalData:PersonalDataEntity = this.personalDataRepository.create(cvInfoDTO.personalDataDTO)
        const newCVDataArray:CVDataEntity[] = this.cvDataRepository.create(cvInfoDTO.cvData)
        candidate.personalData=newPersonalData
        candidate.cvData=newCVDataArray
        return await this.candidateRepository.save(candidate)
    }



}
