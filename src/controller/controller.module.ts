import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { UserController } from './user/user.controller';
import { JobCallController } from './job-call/job-call.controller';
import { CvController } from './cv/cv.controller';
import { JobApplyController } from './job-apply/job-apply.controller';
import { CollegeClassController } from './college-class/college-class.controller';
import { FileController } from './file/file.controller';


@Module({
    imports:[ServiceModule],
    controllers:[UserController, JobCallController, CvController, JobApplyController, CollegeClassController, FileController]
})
export class ControllerModule {}
