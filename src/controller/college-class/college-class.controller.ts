import { Controller, Get } from '@nestjs/common';
import { Roles } from 'src/decorator/role.decorator';
import { RoleType } from 'src/persistence/enum/role-type.enum';
import { CollegeClassService } from 'src/service/college-class/college-class.service';

@Controller('college-class')
export class CollegeClassController {

    constructor(private carerrClassService:CollegeClassService){}

    @Roles(RoleType.RECRUITER)
    @Get()
    async getCollegeClasses(){
        return await this.carerrClassService.getCollegeClasses()
    }
}
