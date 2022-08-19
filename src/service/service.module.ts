import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { TokenService } from './token/token.service';
import { EncryptionService } from './encryption/encryption.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/persistence/user.entity';
import { DataBaseEnum } from 'src/persistence/enum/data-base.enum';
import { JobCallService } from './job-call/job-call.service';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity],DataBaseEnum.ORACLE)],
    providers:[UserService, TokenService, EncryptionService, JobCallService],exports:[UserService,TokenService,EncryptionService]})
export class ServiceModule {}
