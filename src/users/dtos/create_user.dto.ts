import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength,IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsUUID()
  id:string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @IsEnum(['student', 'admin'])
  @IsNotEmpty()
  role: 'student' | 'admin';
}
