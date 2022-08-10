import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { TokenService } from './token/token.service';
import { EncryptionService } from './encryption/encryption.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/persistence/user.entity';
import { DataBaseEnum } from 'src/persistence/enum/data-base.enum';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity],DataBaseEnum.POSTGRES)],
    providers:[UserService, TokenService, EncryptionService],exports:[UserService,TokenService,EncryptionService]})
export class ServiceModule {}
