import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerModule } from './controller/controller.module';
import { DataBaseEnum } from './persistence/enum/data-base.enum';
import { ServiceModule } from './service/service.module';
import { GuardModule } from './guard/guard.module';

import { ScheduleModule } from '@nestjs/schedule';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      name: 'postgres',
      type: DataBaseEnum.ORACLE,
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'TallerDeGrado-2022',
      database: 'ucb-rrhh',
      autoLoadEntities: true,
      synchronize: true,
      entities: [__dirname + '/persistence/*.entity{.ts,.js}']
    }),
    ScheduleModule.forRoot(),
    ControllerModule, ServiceModule, GuardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
