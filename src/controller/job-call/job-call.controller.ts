import { Body, Controller, Get, Post } from '@nestjs/common';
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
    async createJobCall(@Body() jobCallDTO:JobCallDTO ){
        return await this.jobCallService.newJobCall(jobCallDTO)
        
    }

    @Get('/saved')
    @Roles(RoleType.RECRUITER)
    async getSavedJobCalls(){
        return this.jobCallService.getJobCalls(JobCallStatusEnum.SAVED)
    }
}
