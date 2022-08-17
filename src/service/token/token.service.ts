import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/persistence/user.entity';

@Injectable()
export class TokenService {

    generateToken(user:UserEntity){
        const privateKey="456454545asddsadasdasfdasd4as54ffjiojfiJFSJFKSjfSJFJKJifoefsdadas"
        const now = Math.floor(Date.now() / 1000);
        const payload={
            role:user.role,
            id:user.id,
            email:user.email,
            iat: now,
        }
        return jwt.sign(payload,privateKey,{expiresIn:'2h'})
    }

}
