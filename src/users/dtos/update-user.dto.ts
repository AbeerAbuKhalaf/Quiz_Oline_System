import {
  IsString,
  IsEmail,
  IsUUID,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string;

  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  @IsOptional()
  password: string;

  @IsEnum(['student', 'admin'])
  @IsNotEmpty()
  role: 'student' | 'admin';
  @IsUUID()
  @IsNotEmpty()
  created_by: string;

  @IsUUID()
  @IsNotEmpty()
  updated_by: string;
}
