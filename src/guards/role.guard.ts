import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { I18nService } from 'nestjs-i18n';
import { ROLES_KEY } from 'src/users/decorators/role-user.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService, // Inject JwtService
    private readonly i18n: I18nService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const user = this.jwtService.verify(token);

    const value= requiredRoles.some((role) => user.role === role);
    if(!value){
      throw new ForbiddenException(
        await this.i18n.translate('test.ADMIN ROLE'),
      );
    }
    return value;
     //throw new ForbiddenException(await this.i18n.translate('test.ADMIN ROLE'));
  }
}
