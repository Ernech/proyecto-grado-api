import { Module } from '@nestjs/common';
import { ServiceModule } from 'src/service/service.module';
import { UserController } from './user/user.controller';

@Module({
    imports:[ServiceModule],
    controllers:[UserController]
})
export class ControllerModule {}
