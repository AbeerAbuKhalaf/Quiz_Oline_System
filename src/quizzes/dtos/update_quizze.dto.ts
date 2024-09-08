import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
export class UpdateQuizDto{
    @IsOptional()
    @IsUUID()
    id:string;

    @IsOptional()
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description?: string;
  
}