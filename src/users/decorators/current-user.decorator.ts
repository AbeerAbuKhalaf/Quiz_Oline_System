import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user.entity';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async extractUser(context: ExecutionContext): Promise<User> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const decoded = this.jwtService.verify(token) as {
        sub: string;
        email: string;
      };
      const userId = decoded.sub;

      const user = await this.usersService.findOne(userId);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      request.user = user; // Attach the user to the request object
      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}

export const CurrentUser = createParamDecorator(
  async (data: unknown, context: ExecutionContext): Promise<User> => {
    const request = context.switchToHttp().getRequest();
    return request.user; // Retrieve the user from the request object
  },
);
