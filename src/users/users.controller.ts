import { Controller, Delete, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Param, Get } from '@nestjs/common';
import { CreateUserDto } from './dtos/create_user.dto';
import { Post, Body, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { UnauthorizedException } from '@nestjs/common';
import { request, response, Response } from 'express';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('token');
    return "success";
  }

  @Get('/whoami')
  async whoAmI(@Req() request: Request) {
    const cooki = request.cookies['token'];
    const data = await this.jwtService.verifyAsync(cooki);
    const user = await this.userService.findOne(data['id']);
    //hide password from output
    const { password, ...result } = user;
    return result;
  }
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const encryptedPassword = await this.authService.secret(
      createUserDto.password,
    );

    // Replace the plain password with the encrypted one
    createUserDto.password = encryptedPassword;

    // Pass the updated createUserDto to the user service to save it in the database
    return this.userService.create(createUserDto);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.remove(id);
  }
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ token: string }> {
    const token = await this.authService.login(email, password);
    response.cookie('token', token, { httpOnly: true });
    //return { token };
    return { token: token };
  }
}
