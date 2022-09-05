import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Param, Patch } from '@nestjs/common/decorators';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { Roles } from 'src/decorator/role.decorator';
import { JobCallDTO } from 'src/dto/job-call.dto';
import { RoleType } from 'src/persistence/enum/role-type.enum';
import { JobCallService } from 'src/service/job-call/job-call.service';
import {JobCallStatusEnum} from'../../persistence/enum/job-call-status.enum'

@Controller('job-call')
export class JobCallController {

    constructor(private jobCallService:JobCallService){}

    @Post()
    @Roles(RoleType.RECRUITER)
    async createJobCall(@Body() jobCallDTO:JobCallDTO){
        return await this.jobCallService.newJobCall(jobCallDTO)
        
    }

    @Get('/saved')
    @Roles(RoleType.RECRUITER)
    async getSavedJobCalls(){
        return this.jobCallService.getJobCalls(JobCallStatusEnum.SAVED)
    }
    @Get('/pending')
    @Roles(RoleType.RECRUITER)
    async getPendingJobCalls(){
        return this.jobCallService.getJobCalls(JobCallStatusEnum.PENDING)
    }
    
    @Put('/:id')
    @Roles(RoleType.RECRUITER)
    async editJobCall(
        @Param('id',new ParseUUIDPipe()) id:string,
        @Body() jobcallDto:JobCallDTO){
        return await this.jobCallService.editJobCall(id,jobcallDto)
    }
    @Patch('/:id')
    @Roles(RoleType.RECRUITER)
    async publishJobCall(@Param('id',new ParseUUIDPipe()) id:string){
        this.jobCallService.publishJobCall(id)

    }
}
