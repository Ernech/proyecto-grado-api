import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { RecruiterEntity } from 'src/persistence/recruiter.entity';
import { CandidateEntity } from 'src/persistence/candidate.entity';
require('dotenv').config();

@Injectable()
export class TokenService {

    generateToken(recruiter:RecruiterEntity){
        const privateKey='45645csa45aadasdafjiojfiJFSJJKJifoefsdadas.hjhjkhjk156156dsadasdsadsad.sadsjakdjsdsad456as4dsad';
        const now = Math.floor(Date.now() / 1000);
        const payload={
            role:recruiter.role,
            id:recruiter.id,
            email:recruiter.email,
            iat: now,
        }
        return jwt.sign(payload,privateKey,{expiresIn:'2h'})
    }
    generateCandidateToken(candidate:CandidateEntity){
        const privateKey='45645csa45aadasdafjiojfiJFSJJKJifoefsdadas.hjhjkhjk156156dsadasdsadsad.sadsjakdjsdsad456as4dsad';
        const now = Math.floor(Date.now() / 1000);
        const payload={
            role:candidate.role,
            id:candidate.id,
            email:candidate.email,
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
        const privateKey='45645csa45aadasdafjiojfiJFSJJKJifoefsdadas.hjhjkhjk156156dsadasdsadsad.sadsjakdjsdsad456as4dsad';
        return jwt.verify(token,privateKey)
    }

}
