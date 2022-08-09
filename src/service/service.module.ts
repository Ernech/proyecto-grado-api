import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { TokenService } from './token/token.service';

@Module({providers:[UserService, TokenService],exports:[UserService]})
export class ServiceModule {}
