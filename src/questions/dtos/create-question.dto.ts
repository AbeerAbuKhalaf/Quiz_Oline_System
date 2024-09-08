import { IsNotEmpty, IsOptional, IsString, IsUUID, IsEnum } from 'class-validator';

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

  @IsNotEmpty()
  @IsEnum(['multiple_choice', 'true_false'])
  question_type: 'multiple_choice' | 'true_false';

  @IsOptional()
  @IsUUID()
  created_by?: string;

  @IsOptional()
  @IsUUID()
  updated_by?: string;
}
