import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from 'src/decorator/role.decorator';
import { ApplyDTO } from 'src/dto/apply.dto';
import { RoleType } from 'src/persistence/enum/role-type.enum';
import { JobApplyService } from 'src/service/job-apply/job-apply.service';

@Controller('job-apply')
export class JobApplyController {

    constructor(private jobApplyService:JobApplyService){}

    @Post()
    @Roles(RoleType.CANDIDATE)
    async createNewJobApply(@Body() applyDTO:ApplyDTO){
        return await this.jobApplyService.newJobApply(applyDTO.candidateId,applyDTO.jobCallId)
        
    }
}
