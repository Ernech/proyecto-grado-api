import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ServiceModule } from 'src/service/service.module';
import { RoleGuard } from './role.guard';
import { TokenGuard } from './token.guard';

@Module({

    imports:[ServiceModule],
    providers:[
        {
            provide:APP_GUARD,
            useClass:TokenGuard
        },
        {
            provide:APP_GUARD,
            useClass:RoleGuard
        }
    ]

})
export class GuardModule {}
