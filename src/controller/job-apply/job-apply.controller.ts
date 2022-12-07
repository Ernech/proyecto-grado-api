import { Body, Controller, Post,Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { Roles } from 'src/decorator/role.decorator';
import { ApplyDTO } from 'src/dto/apply.dto';
import { RoleType } from 'src/persistence/enum/role-type.enum';
import { JobApplyService } from 'src/service/job-apply/job-apply.service';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { Authorization } from 'src/decorator/auth.decorator';

@Controller('job-apply')
export class JobApplyController {

    constructor(private jobApplyService:JobApplyService){}

    @Post()
    @Roles(RoleType.CANDIDATE)
    async createNewJobApply(@Body() applyDTO:ApplyDTO){
        return await this.jobApplyService.newJobApply(applyDTO.candidateId,applyDTO.jobCallId)
        
    }
    @Get('/prediction')
    async getPrediction(){
        return await this.jobApplyService.prediction()
    }

    @Get('/:id')
    @Roles(RoleType.CANDIDATE,RoleType.RECRUITER)
    async getApplyById(@Param('id',new ParseUUIDPipe()) id:string){
        return await this.jobApplyService.getJobCallApplyById(id)
    }

    
    @Post('/teacher')
    @Roles(RoleType.CANDIDATE)
    async createNewTeacherJobApply(@Body() applyDTO:ApplyDTO){
        return await this.jobApplyService.newTeacherJobApply(applyDTO.candidateId,applyDTO.jobCallId)
        
    }

   

    @Get('teacher/:id')
    @Roles(RoleType.CANDIDATE,RoleType.RECRUITER)
    async getTeacherApplyById(@Param('id',new ParseUUIDPipe()) id:string){
        return await this.jobApplyService.getTeacherJobCallApplyById(id)
    }
    
    @Get('/candidate/:id')
    @Roles(RoleType.CANDIDATE)
    async getCandidateApplies(@Param('id',new ParseUUIDPipe()) id:string){
        return await this.jobApplyService.getCandidateJobCallsApplies(id)
    }
    @Get('/teacher/candidate/:id')
    @Roles(RoleType.CANDIDATE)
    async getCandidateTeacherApplies(@Param('id',new ParseUUIDPipe()) id:string){
        return await this.jobApplyService.getCandidateTeacherJobCallsApplies(id)
    }

    
}
