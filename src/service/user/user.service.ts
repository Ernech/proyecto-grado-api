import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';

@Injectable()
export class UserService {

    async hello(){
        return {msg:'Hello World'}
    }

    async loginUser(loginDTO:LoginDTO){
        if(loginDTO.email == 'admin@test.com' && loginDTO.password=='1234abcd'){
            return {msg:'Login'}
        }else{
            throw new UnauthorizedException('Credenciales incorrectas')
        }
    }
}
