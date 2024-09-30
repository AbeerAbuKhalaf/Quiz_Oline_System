import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,private i18n:I18nService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
     
       throw new UnauthorizedException(await this.i18n.translate("test.NO TOKEN"));
      //return false;
    }

    try {
      const user = await this.jwtService.verifyAsync(token);
      request.user = user; // Attach user to request
      return true;
    } catch (error) {
      return false;
    }
  }
}
