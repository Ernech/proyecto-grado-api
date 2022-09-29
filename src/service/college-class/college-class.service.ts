import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CollegeClassEntity } from 'src/persistence/college-class.entity';
import { DataBaseEnum } from 'src/persistence/enum/data-base.enum';
import { Repository } from 'typeorm';

@Injectable()
export class CollegeClassService {


    constructor(@InjectRepository(CollegeClassEntity,DataBaseEnum.ORACLE) private collegeClassRepository:Repository<CollegeClassEntity>){}



    async getCollegeClassById(id:string){
        const collegeClass = await this.collegeClassRepository.findBy({id,status:1});
        if(!collegeClass){
            throw new NotFoundException('Materia no encontrada')
        }
        return collegeClass
    }
}
