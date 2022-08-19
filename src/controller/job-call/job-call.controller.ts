import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/decorator/role.decorator';
import { JobCallDTO } from 'src/dto/job-call.dto';
import { RoleGuard } from 'src/guard/role.guard';
import { RoleType } from 'src/persistence/enum/role-type.enum';
import { JobCallService } from 'src/service/job-call/job-call.service';

@Controller('job-call')
export class JobCallController {

    constructor(private jobCallService:JobCallService){}

    @Post()
    @Roles(RoleType.RECRUITER)
    async createJobCall(@Body() jobCallDTO:JobCallDTO ){
        return 'new job call';
        // return await this.jobCallService.newJobCall(jobCallDTO)
        
    }
}
