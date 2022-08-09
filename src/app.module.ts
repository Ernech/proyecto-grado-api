import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserControllerController } from './user/user-controller/user-controller.controller';
import { UserControllerController } from './controller/user/user-controller/user-controller.controller';
import { UserController } from './controller/user/user/user.controller';
import { UserController } from './controller/user/user.controller';
import { UserService } from './service/user/user.service';
import { ServiceModule } from './service/service.module';
import { ControllerModule } from './controller/controller.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'postgres',
    host: 'localhost',
    port: 5432,
    username:'admin',
    password:'proyecto-grado-2022',
    database:'ucb-rrhh',
    autoLoadEntities:true,
    synchronize:true,
    entities:[__dirname + '/persistence/*.entity{.ts,.js}']
  }), ServiceModule, ControllerModule],
  controllers: [AppController, UserControllerController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
