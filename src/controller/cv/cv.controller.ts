import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { Roles } from 'src/decorator/role.decorator';
import { CVInfoDTO } from 'src/dto/cv-info.dto';
import { RoleType } from 'src/persistence/enum/role-type.enum';
import { CvService } from 'src/service/cv/cv.service';

@Controller('cv')
export class CvController {

    constructor(private cvService:CvService){}


    @Post(':id/candidate')
    @Roles(RoleType.CANDIDATE)
    async createCV(@Param('id',new ParseUUIDPipe()) candidateId:string, @Body() cvInfoDTO:CVInfoDTO){

        return this.cvService.saveCV(candidateId,cvInfoDTO);

    }
    
    @Get('candidate/:id')
    @Roles(RoleType.CANDIDATE)
    async getCVByCandidateId(@Param('id',new ParseUUIDPipe()) candidateId:string){
       return "Get cv " + candidateId
        // return this.cvService.getCVByCandidateId(candidateId)
    }
    

}
