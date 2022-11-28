import { Controller, Get, StreamableFile, Res } from '@nestjs/common';
import {Param} from '@nestjs/common/decorators';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { JobApplyService } from 'src/service/job-apply/job-apply.service';
import { Readable } from 'stream';

@Controller('file')
export class FileController {

constructor(private jobApplyService:JobApplyService ){}

    @Get('/proffesional-title/:id')
    async getFile(@Param('id', new ParseUUIDPipe()) id:string, @Res({ passthrough: true }) response: Response){
        const {professionalTitleFile,professionalTitleFileName}= await this.jobApplyService.getProffesionalTitleFromJobCallApply(id)
        const stream = Readable.from(professionalTitleFile)
        response.set({
            'Content-Disposition': `inline; filename="${professionalTitleFileName}"`,
            'Content-Type': 'application/pdf'
          })
        return new StreamableFile(stream);
    }



}
