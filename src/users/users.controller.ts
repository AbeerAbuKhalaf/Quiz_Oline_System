import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  Res,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create_user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/auth.guard';
import { BodyDto } from './decorators/body-dto.decorator';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BodyDtoUpadte } from './decorators/body-update.decorator';
import { I18nService } from 'nestjs-i18n';

@ApiTags('User Module')
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly i18n: I18nService,
  ) {}

  // ---- Authentication-related endpoints ----
  //---------------------------------------Login----------------------------------------------------------

  @Post('login')
  @ApiOperation({ summary: 'Log in a user and return a JWT token' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in, token returned',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, invalid email or password',
  })
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ token: string }> {
    try {
      const token = await this.authService.login(email, password);
      response.cookie('token', token, { httpOnly: true });
      return { token };
    } catch (error) {
      throw new UnauthorizedException(
        await this.i18n.translate('test.INVALID CREDENTIALS'),
      );
    }
  }

  //----------------------------------------LogOut----------------------------------------------------------

  @Post('logout')
  @ApiOperation({ summary: 'Log out the user and clear the token' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged out, token cleared',
    schema: {
      type: 'string',
      example: 'Logged out successfully',
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, no token to clear',
  })
  async logout(
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    response.clearCookie('token');
    return 'Logged out successfully';
  }

  //------------------------------CurrentUser---------------------------------------------------------------

  @Get('/whoami')
  @ApiOperation({ summary: 'Get details of the currently logged-in user' })
  @ApiResponse({
    status: 200,
    description: 'User details without password',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized, token not found or invalid',
  })
  async whoAmI(@Req() request: Request): Promise<Omit<User, 'password'>> {
    try {
      const token = request.cookies['token'];
      if (!token) {
        throw new UnauthorizedException('No token found');
      }

      const data = await this.jwtService.verifyAsync(token);
      const user = await this.userService.findOne(data['id']);
      const { password, ...userWithoutPassword } = user;

      return userWithoutPassword;
    } catch (error) {
      throw new UnauthorizedException(
        await this.i18n.translate('test.TOKEN INVALID'),
      );
    }
  }

  // ---- User management endpoints ----
  //Return User---------------------------------------------------------------------------------------

  @Get(':id')
  @ApiOperation({ summary: 'Get all data from this api' })
  @ApiResponse({
    status: 200,
    description: 'All Data list',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async getUser(@Param('id') id: string): Promise<User> {
    try {
      const user = await this.userService.findOne(id);
      return user;
    } catch (error) {
      throw new NotFoundException(
        await this.i18n.translate('test.USER_NOT_FOUND'),
      );
    }
  }

  //Create User------------------------------------------------------------------------------
  // @UseGuards(JwtAuthGuard)

  @Post('signup')
  @ApiOperation({ summary: 'Create a new user record' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request due to invalid input',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden access',
  })
  async createUser(
    @BodyDto(CreateUserDto) createUserDto: CreateUserDto,
  ): Promise<User> {
    try {
      const encryptedPassword = await this.authService.secret(
        createUserDto.password,
      );
      createUserDto.password = encryptedPassword;
      return await this.userService.create(createUserDto);
    } catch (error) {
      throw new BadRequestException(
        await this.i18n.translate('test.FAILED TO CREATE USER'),
      );
    }
  }

  //Update User --------------------------------------------------------------------------------------
  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  @ApiOperation({ summary: 'update the record' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'updated successfully',
  })
  @ApiResponse({
    status: 403,
    description: 'Fobidden',
  })
  async updateUser(
    @Param('id') id: string,
    @BodyDtoUpadte(UpdateUserDto) updateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (error) {
      throw new BadRequestException(
        await this.i18n.translate('test.FAILED TO UPDATE USER'),
      );
    }
  }

  //Delet User-----------------------------------------------------------------------------------

  @Delete('/:id')
  @ApiOperation({ summary: 'delete the record' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'deleted the record',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
  })
  async removeUser(@Param('id') id: string): Promise<User> {
    try {
      return await this.userService.remove(id);
    } catch (error) {
      throw new NotFoundException(this.i18n.translate('test.USER_NOT_FOUND'));
    }
  }
  
}
