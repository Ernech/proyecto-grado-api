import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { TokenService } from '../token/token.service';

@Injectable()
export class UserService {
    constructor(private tokenservice:TokenService){}

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
}
