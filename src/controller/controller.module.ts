import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { UserController } from './user/user.controller';
import { JobCallController } from './job-call/job-call.controller';
import { CvController } from './cv/cv.controller';

@Module({
    imports:[ServiceModule],
    controllers:[UserController, JobCallController, CvController]
})
export class ControllerModule {}
