import { IsNotEmpty, IsOptional, IsString, IsUUID, IsEnum } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateQuestionDto {
  @IsNotEmpty()
  @IsUUID()
  id: string;

  @IsNotEmpty()
  @IsUUID()
  quiz_id: string;

  @IsNotEmpty()
  @IsString()
  question_text: string;

  
  @IsString()
  @IsEnum(['multiple_choice', 'true_false'])
  @IsNotEmpty()
  question_type: 'multiple_choice' | 'true_false';

  @IsOptional()
  @IsUUID()
  created_by: string;

  @IsOptional()
  @IsUUID()
  updated_by: string;
}
