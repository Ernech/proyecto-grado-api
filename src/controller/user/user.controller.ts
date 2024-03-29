import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { Authorization } from 'src/decorator/auth.decorator';
import { LoginDTO } from 'src/dto/login.dto';
import { RegisterCandidateDTO } from 'src/dto/register-candidate.dto';
import { RegisterRecruiterDTO } from 'src/dto/register-recuiter.dto';
import { UserService } from 'src/service/user/user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    async helloWorld() {
        return this.userService.hello()
    }

    @Post()
    async createUser(@Body() registerUserDTO: RegisterRecruiterDTO) {
        return this.userService.registerRecuiter(registerUserDTO)
    }

    @Authorization(false)
    @Post('/candidate')
    async createCandidate(@Body() registerUserDTO: RegisterCandidateDTO) {
        return await this.userService.registerCandidate(registerUserDTO)
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

    @Authorization(false)
    @Post('/candidate/token')
    async loginCandidate(@Body() loginDTO: LoginDTO) {
        const token = await this.userService.loginCandidate(loginDTO.email,loginDTO.password)
        if(token){
           
            return {token}
        }
        throw new UnauthorizedException('Contraseña Incorrecta')
    }

}
