import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptionService {

    async cryptPassword(password:String){
        const salt = await bcrypt.genSalt();
        const cryptedPassword = await bcrypt.hash(password,salt);
    
        return cryptedPassword;
    }
}
