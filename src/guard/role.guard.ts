import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core'
import { RoleType } from 'src/persistence/enum/role-type.enum';
import { TokenService } from 'src/service/token/token.service';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private readonly _reflector: Reflector, private tokenService: TokenService) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this._reflector.getAllAndOverride<RoleType>('roles', [context.getHandler(), context.getClass()])

    if (!roles) {
      return true
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException('No tiene permiso para accedera este recurso')
    }

    const role = this.tokenService.getRoles(token)
    const hasRole = () => roles.includes(role)
    return hasRole()
  }
}
