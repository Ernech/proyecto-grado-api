import { Controller, Get, StreamableFile, Res } from '@nestjs/common';
import {Param} from '@nestjs/common/decorators';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { createReadStream } from 'fs';
import { join } from 'path';
import type { Response } from 'express';
import { JobApplyService } from 'src/service/job-apply/job-apply.service';


@Controller('file')
export class FileController {

constructor(private jobApplyService:JobApplyService ){}

    @Get('/proffesional-title/:id')
    async getFile(@Param('id', new ParseUUIDPipe()) id:string){
        const {professionalTitleFile,professionalTitleFileName}= await this.jobApplyService.getProffesionalTitleFromJobCallApply(id)
         return professionalTitleFile;
    }



}
