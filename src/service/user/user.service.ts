import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDTO } from 'src/dto/login.dto';
import { RegisterRecruiterDTO } from 'src/dto/register-recuiter.dto';
import { DataBaseEnum } from 'src/persistence/enum/data-base.enum';
import { RecruiterEntity } from 'src/persistence/recruiter.entity';
import { Repository } from 'typeorm';
import { EncryptionService } from '../encryption/encryption.service';
import { TokenService } from '../token/token.service';

@Injectable()
export class UserService {
    constructor(@InjectRepository(RecruiterEntity,DataBaseEnum.ORACLE)
        private recuiterRepository:Repository<RecruiterEntity>,
        private tokenservice:TokenService,
        private encryptionService:EncryptionService){}

    async hello(){
        return {msg:'Hello World'}
    }

    async loginUser(email:string,password:string){
        const user  = await this.recuiterRepository.findOneBy({email,status:1})
        if(!user){
            throw new UnauthorizedException('Credenciales incorrectas')
        }
        const verifyPassword = await this.encryptionService.verifyPassword(password,user.password);
        if(verifyPassword){
            return this.tokenservice.generateToken(user);
        }
        return null
    }

    async registerRecuiter(registerUserDTO:RegisterRecruiterDTO){
         registerUserDTO.password= await this.encryptionService.cryptPassword(registerUserDTO.password)
         const newUser = this.recuiterRepository.create(registerUserDTO);
         return await this.recuiterRepository.save(newUser).catch((error)=>{
            throw new ConflictException('Hubo un error al registrar al usuario')
         })

    }
}
