import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
export class UpdateQuizDto {
  @IsOptional()
  @IsUUID()
  id: string;

  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsUUID()
  @IsNotEmpty()
  created_by: string;

  @IsUUID()
  @IsNotEmpty()
  updated_by: string;
}