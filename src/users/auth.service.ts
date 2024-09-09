import { Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { randomBytes, scrypt as _scrypy } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

const scrypt = promisify(_scrypy);
@Injectable()
export class AuthService {
  private readonly jwtSecret = 's2#O!4jE9w@1x^U$5R0pQ6r+8LkL3Zt1@R*8N2Vf+U9F'; // Replace with your own secret key
  private readonly jwtExpiresIn = '1h'; // Token expiration time

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async secret(password: string) {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    return result;
  }

  async verifyPassword(
    email: string,
    inputPassword: string,
  ): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return null;
    }

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(inputPassword, salt, 32)) as Buffer;
    if (storedHash === hash.toString('hex')) {
      return user; // Password is correct, return the user object
    }
    return null; // Password is incorrect
  }
  async login(email: string, password: string): Promise<string> {
    const user = await this.verifyPassword(email, password); // Verify password and get user
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.generateJwt(user); // Generate and return JWT
  }

  async generateJwt(user: User) {
   /* const payload = { sub: user.id, email: user.email }; // Customize payload as needed
    const token = jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn,
    });
    return token;
  }*/
    const jwt=await this.jwtService.signAsync({id:user.id});
    
     return jwt;
  }
}