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
    constructor(@InjectRepository(UserEntity,DataBaseEnum.ORACLE)
        private userRepository:Repository<UserEntity>,
        private tokenservice:TokenService,
        private encryptionService:EncryptionService){}

    async hello(){
        return {msg:'Hello World'}
    }

    async loginUser(email:string,password:string){
        const user  = await this.userRepository.findOneBy({email,status:1})
        if(!user){
            throw new UnauthorizedException('Credenciales incorrectas')
        }
        const verifyPassword = await this.encryptionService.verifyPassword(password,user.password);
        if(verifyPassword){
            return this.tokenservice.generateToken(user);
        }
        return null
    }

    async registerUser(registerUserDTO:RegisterUserDTO){
         registerUserDTO.password= await this.encryptionService.cryptPassword(registerUserDTO.password)
         const newUser = this.userRepository.create(registerUserDTO);
         return await this.userRepository.save(newUser).catch((error)=>{
            throw new ConflictException('Hubo un error al registrar al usuario')
         })

    }
}
