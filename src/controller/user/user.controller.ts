import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { UserService } from 'src/service/user/user.service';

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Get()
    async helloWorld(){
       return this.userService.hello()
    }

    @Post()
    async loginUser(@Body() loginDTO:LoginDTO){
        return this.userService.loginUser(loginDTO)
    }
    
}
