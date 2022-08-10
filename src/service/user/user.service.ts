import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from 'src/dto/login.dto';
import { RegisterUserDTO } from 'src/dto/register-user.dto';
import { DataBaseEnum } from 'src/persistence/enum/data-base.enum';
import { UserEntity } from 'src/persistence/user.entity';
import { Repository } from 'typeorm';
import { EncryptionService } from '../encryption/encryption.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity,DataBaseEnum.POSTGRES)
        private userRepository:Repository<UserEntity>,
        private tokenservice:TokenService,
        private encryptionService:EncryptionService){}

    async hello(){
        return {msg:'Hello World'}
    }

    async loginUser(loginDTO:LoginDTO){
        if(loginDTO.email == 'admin@test.com' && loginDTO.password=='1234abcd'){
            const token = this.tokenservice.generateToken();
            return {token};
        }else{
            throw new UnauthorizedException('Credenciales incorrectas')
        }
    }

    async registerUSer(registerUserDTO:RegisterUserDTO){
         registerUserDTO.password= await this.encryptionService.cryptPassword(registerUserDTO.password)
         const newUser = this.userRepository.create(registerUserDTO);
         return await this.userRepository.save(newUser).catch((error)=>{
            throw new ConflictException('Hubo un error al registrar al usuario')
         })

    }
}
