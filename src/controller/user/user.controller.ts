import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginDTO } from 'src/dto/login.dto';
import { RegisterUserDTO } from 'src/dto/register-user.dto';
import { UserService } from 'src/service/user/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async helloWorld() {
        return this.userService.hello()
    }

    @Post()
    async createUser(@Body() registerUserDTO: RegisterUserDTO) {
        return this.userService.registerUSer(registerUserDTO)
    }


    @Post('/token')
    async loginUser(@Body() loginDTO: LoginDTO) {
        return this.userService.loginUser(loginDTO)
    }

}
