import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { Param, Patch } from '@nestjs/common/decorators';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { Authorization } from 'src/decorator/auth.decorator';
import { Roles } from 'src/decorator/role.decorator';
import { AddCollegeClassDTO } from 'src/dto/add-college-class.dto';
import { CollegeCareerDTO } from 'src/dto/college-career.dto';
import { CollegeClassDTO } from 'src/dto/college-class-dto';
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
    @Get('/candiates/teacher/:id')
    @Roles(RoleType.RECRUITER)
    async getCandidatesAppliedToTeacherJobCall(@Param('id',new ParseUUIDPipe()) id:string){
        return this.jobCallService.getTeacherJobCallWithCandidatesByJobCallId(id)
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
    
    @Get('/teacher-jc/:id')
    @Roles(RoleType.RECRUITER)
    async getTeacherJobCallById(@Param('id',new ParseUUIDPipe) id:string){
        return this.jobCallService.getTeacherJobCallById(id)
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

    @Post('/college-career')
    @Roles(RoleType.RECRUITER)
    async createCollegeCareer(@Body() collegeCareeDTO:CollegeCareerDTO){
        return this.jobCallService.addCollegeCareer(collegeCareeDTO)
    }

    @Get('/college-career')
    @Roles(RoleType.RECRUITER)
    async getCollegeCareers(){
        return this.jobCallService.getCollegeCareers()
    }

    @Post('/career-class/:id')
    @Roles(RoleType.RECRUITER)
    async addCollegeClass(@Param('id',new ParseUUIDPipe()) id:string,@Body() collegeClassDTO:CollegeClassDTO){
        return this.jobCallService.createCollegeClass(id,collegeClassDTO)
    }

}
