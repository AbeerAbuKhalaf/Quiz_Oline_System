import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { OptionsService } from 'src/options/options.service'; // Ensure the path is correct

@Injectable()
export class CurrentOptionGuard implements CanActivate {
  constructor(
    private readonly optionsService: OptionsService,
    private readonly jwtService: JwtService, // Inject the JwtService to decode the token
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new Error('Authorization header missing');
    }

    // Extract the token from the Bearer authorization
    const token = authHeader.split(' ')[1];

    // Decode the JWT token
    const decodedToken = this.jwtService.decode(token) as any;

    if (decodedToken && decodedToken.option_id) {
      // Find the option using the option_id from the token
      const option = await this.optionsService.findOne(decodedToken.option_id);

      if (!option) {
        throw new Error('Option not found');
      }

      // Attach the option to the request object
      request.option = option;
    } else {
      throw new Error('Option ID is missing from the token');
    }

    return true; // Allow the request to proceed
  }
}
