import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Param, Patch } from '@nestjs/common/decorators';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { Authorization } from 'src/decorator/auth.decorator';
import { Roles } from 'src/decorator/role.decorator';
import { AddCollegeClassDTO } from 'src/dto/add-college-class.dto';
import { JobCallDTO } from 'src/dto/job-call.dto';
import { NewTeacherJobCallDTO } from 'src/dto/new-teacher-job-call.dto';
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
    @Post('/teacher')
    @Roles(RoleType.RECRUITER)
    async createTeacherJobCall(@Body() jobCallDTO:NewTeacherJobCallDTO){
        return await this.jobCallService.newTeacherJobCall(jobCallDTO) 
    }

    @Patch('/teacher/:id')
    @Roles(RoleType.RECRUITER)
    async addCollegeClassToTeacherJobCall(@Param('id',new ParseUUIDPipe()) id:string,@Body() collegeClasses:AddCollegeClassDTO){
        return await this.jobCallService.addCollegeClassesToJobCall(id,collegeClasses) 
    }

    @Get('/saved')
    @Roles(RoleType.RECRUITER)
    async getSavedJobCalls(){
        return this.jobCallService.getJobCalls(JobCallStatusEnum.SAVED)
    }

    @Get('/candiates/:id')
    @Roles(RoleType.RECRUITER)
    async getCandidatesApplied(@Param('id',new ParseUUIDPipe()) id:string){
        return this.jobCallService.getJobCallWithCandidatesByJobCallId(id)
    }
    @Get('/pending')
    @Roles(RoleType.RECRUITER)
    async getPendingJobCalls(){
        return this.jobCallService.getJobCalls(JobCallStatusEnum.PENDING)
    }

    @Authorization(false)
    @Get('/opened/teacher')
    async getOpenedTeacherJobCall(){
        return this.jobCallService.getTeacherJobCall(JobCallStatusEnum.OPEN)
    }
    @Authorization(false)
    @Get('/teacher/:id')
    async getTeacherJobCallInfo(@Param('id',new ParseUUIDPipe) id:string){
        return this.jobCallService.getTeacherJobCallInfoById(id)
    }
   
    @Authorization(false)
    @Get('/opened')
    async getOpenedJobCalls(){
        return this.jobCallService.getJobCalls(JobCallStatusEnum.OPEN)
    }
    
    @Get('/closed')
    @Roles(RoleType.RECRUITER)
    async getClosedJobCalls(){
        return this.jobCallService.getJobCalls(JobCallStatusEnum.CLOSED)
    }
    @Put('/:id')
    @Roles(RoleType.RECRUITER)
    async editJobCall(
        @Param('id',new ParseUUIDPipe()) id:string,
        @Body() jobcallDto:JobCallDTO){
        return await this.jobCallService.editJobCall(id,jobcallDto)
    }
    @Patch('pending/:id')
    @Roles(RoleType.RECRUITER)
    async publishJobCall(@Param('id',new ParseUUIDPipe()) id:string){
        this.jobCallService.publishJobCall(id)

    }
    @Patch('opened/:id')
    @Roles(RoleType.RECRUITER)
    async openJobCall(@Param('id',new ParseUUIDPipe()) id:string){
        this.jobCallService.openJobCallById(id)

    }
    @Patch('closed/:id')
    @Roles(RoleType.RECRUITER)
    async closeJobCall(@Param('id',new ParseUUIDPipe()) id:string){
        this.jobCallService.closeJobCallById(id)

    }
}
