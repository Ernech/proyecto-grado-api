import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { Authorization } from 'src/decorator/auth.decorator';
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
        return this.userService.registerUser(registerUserDTO)
    }

    @Authorization(false)
    @Post('/token')
    async loginUser(@Body() loginDTO: LoginDTO) {
        const token = await this.userService.loginUser(loginDTO.email,loginDTO.password)
        if(token){
           
            return {token}
        }
        throw new UnauthorizedException('Contraseña Incorrecta')
    }

}
