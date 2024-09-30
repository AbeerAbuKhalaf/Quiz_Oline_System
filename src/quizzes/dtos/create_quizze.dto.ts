import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateQuizDto {
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsUUID()
  @IsNotEmpty()
  created_by: string;

  @IsUUID()
  @IsNotEmpty()
  updated_by: string;
}
