import { Controller, Post } from '@nestjs/common';

@Controller('user')
export class UserController {

    @Post()
    async helloWorld(){
        return {msg:'Hello World'}
    }
}
