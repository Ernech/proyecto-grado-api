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
      host: 'ec2-54-147-36-107.compute-1.amazonaws.com',
      port: 5432,
      username: 'ynwyoelxscvqtj',
      password: 'f962fdd1d950044f016e299d7b54c1d37e0b783a6b574380b533b66dee2862d2',
      database: 'd8d6b4funk3a3t',
      url:' postgres://ynwyoelxscvqtj:f962fdd1d950044f016e299d7b54c1d37e0b783a6b574380b533b66dee2862d2@ec2-54-147-36-107.compute-1.amazonaws.com:5432/d8d6b4funk3a3t',
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
