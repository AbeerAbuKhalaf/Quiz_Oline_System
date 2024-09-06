import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateQuizDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsUUID()
  created_by: string; // ID of the admin creating the quiz
}
