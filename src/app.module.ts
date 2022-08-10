import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControllerModule } from './controller/controller.module';
import { DataBaseEnum } from './persistence/enum/data-base.enum';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    name: DataBaseEnum.POSTGRES,
    type: DataBaseEnum.POSTGRES,
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'proyecto-grado-2022',
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
