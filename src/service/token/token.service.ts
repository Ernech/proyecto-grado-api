import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';



@Injectable()
export class TokenService {

    generateToken(){
        const privateKey="456454545asddsadasdasfdasd4as54ffjiojfiJFSJFKSjfSJFJKJifoefsdadas"
        const now = Math.floor(Date.now() / 1000);
        const payload={
            role:'RECRUITER',
            id:'b9452ab2-e768-4acb-a5d2-f80580c0db19',
            iat: now,
        }
        return jwt.sign(payload,privateKey,{expiresIn:'2h'})
    }

}
