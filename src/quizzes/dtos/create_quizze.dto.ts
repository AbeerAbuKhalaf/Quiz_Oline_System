import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateQuizDto {
  @IsUUID()
  id:string;
  
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  description?: string;

}
