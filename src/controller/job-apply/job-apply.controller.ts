import { Body, Controller, Post,Get } from '@nestjs/common';
import { Param } from '@nestjs/common/decorators';
import { Roles } from 'src/decorator/role.decorator';
import { ApplyDTO } from 'src/dto/apply.dto';
import { RoleType } from 'src/persistence/enum/role-type.enum';
import { JobApplyService } from 'src/service/job-apply/job-apply.service';
import { ParseUUIDPipe } from '@nestjs/common/pipes';

@Controller('job-apply')
export class JobApplyController {

    constructor(private jobApplyService:JobApplyService){}

    @Post()
    @Roles(RoleType.CANDIDATE)
    async createNewJobApply(@Body() applyDTO:ApplyDTO){
        return await this.jobApplyService.newJobApply(applyDTO.candidateId,applyDTO.jobCallId)
        
    }

    @Post('/teacher')
    @Roles(RoleType.CANDIDATE)
    async createNewTeacherJobApply(@Body() applyDTO:ApplyDTO){
        return await this.jobApplyService.newTeacherJobApply(applyDTO.candidateId,applyDTO.jobCallId)
        
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
