import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerModule } from './controller/controller.module';
import { DataBaseEnum } from './persistence/enum/data-base.enum';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    name: DataBaseEnum.ORACLE,
    type: DataBaseEnum.ORACLE,
    host: 'localhost',
    port: 1521,
    username: 'SYSTEM',
    password: 'TallerDeGrado-2022',
    database: 'ucb-rrhh',
    autoLoadEntities: true,
    synchronize: true,
    entities: [__dirname + '/persistence/*.entity{.ts,.js}']
  }),
    ControllerModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
