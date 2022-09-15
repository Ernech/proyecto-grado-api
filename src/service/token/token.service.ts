import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { RecruiterEntity } from 'src/persistence/recruiter.entity';
require('dotenv').config();

@Injectable()
export class TokenService {

    generateToken(recruiter:RecruiterEntity){
        const privateKey=process.env.PRIVATEKEY;
        const now = Math.floor(Date.now() / 1000);
        const payload={
            role:recruiter.role,
            id:recruiter.id,
            email:recruiter.email,
            iat: now,
        }
        return jwt.sign(payload,privateKey,{expiresIn:'2h'})
    }

    getRoles(token:String){
        const tokenArray = token.split(' ');
        const {role} = this.validateToken(tokenArray[1])
        return role;
    }

     validateToken(token:string){
        return jwt.verify(token,process.env.PRIVATEKEY)
    }

}
