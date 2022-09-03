import { Module } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ServiceModule } from 'src/service/service.module';
import { RoleGuard } from './role.guard';
import { TokenGuard } from './token.guard';
import { TrimPipe } from './trim.pipe.guard';

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
        },
        {
            provide:APP_PIPE,
            useClass:TrimPipe
        }
    ]

})
export class GuardModule {}
