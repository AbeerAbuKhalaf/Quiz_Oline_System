import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Param,Get } from '@nestjs/common';
import { CreateUserDto } from './dtos/create_user.dto';
import { Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('users')
export class UsersController {
    constructor(private  userService: UsersService,private authService:AuthService ) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const encryptedPassword = await this.authService.secret(createUserDto.password);
    
    // Replace the plain password with the encrypted one
    createUserDto.password = encryptedPassword;
    
    // Pass the updated createUserDto to the user service to save it in the database
    return this.userService.create(createUserDto);
  }
}