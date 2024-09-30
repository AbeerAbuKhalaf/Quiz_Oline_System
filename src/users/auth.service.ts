import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';



const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //-----------------------------------------HashPassword-----------------------------------------------------------

  async secret(password: string): Promise<string> {
    try {
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      const result = salt + '.' + hash.toString('hex');
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Failed to hash password');
    }
  }

  //------------------------------------------CheckPassword--------------------------------------------

  async verifyPassword(
    email: string,
    inputPassword: string,
  ): Promise<User | null> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException(`User with email ${email} not found`);
      }

      const [salt, storedHash] = user.password.split('.');
      const hash = (await scrypt(inputPassword, salt, 32)) as Buffer;

      if (storedHash !== hash.toString('hex')) {
        throw new UnauthorizedException('Invalid password');
      }

      return user; // Password is correct
    } catch (error) {
      throw new UnauthorizedException(
        error.message || 'Password verification failed',
      );
    }
  }

  //------------------------------------Login-------------------------------------------------

   async login(email: string, password: string): Promise<string> {
    try {
      const user = await this.verifyPassword(email, password); // Verify password and get user
      return this.generateJwt(user); // Generate and return JWT
    } catch (error) {
      throw new UnauthorizedException('Login failed: ' + error.message);
    }
  }
 /* async login(email: string, password: string): Promise<string> {
    try {
      const user = await this.verifyPassword(email, password); // Verify password and get user

      // Generate the JWT token
      const token = await this.generateJwt(user);

      // Store the token in Redis cache with a TTL of 1 hour (3600 seconds)
      await this.cacheManager.set(user.id, token);

      return token; // Return the generated token
    } catch (error) {
      throw new UnauthorizedException('Login failed: ' + error.message);
    }
  }*/
  //-----------------------GenerateJWT---------------------------------------------------------------

  async generateJwt(user: User): Promise<string> {
    try {
      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
        role: user.role,
      };

      const token = this.jwtService.sign(payload); // Use JwtService to sign the payload
      return token;
    } catch (error) {
      throw new InternalServerErrorException('Failed to generate JWT');
    }
  }
}
