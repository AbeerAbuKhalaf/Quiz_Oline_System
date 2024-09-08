import { IsNotEmpty, IsOptional, IsString, IsUUID, IsEnum } from 'class-validator';
export class UpdateQuestinDto{
    @IsNotEmpty()
    @IsUUID()
    @IsOptional()
    id: string;
  
    @IsNotEmpty()
    @IsUUID()
    @IsOptional()
    quiz_id: string;
  
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    question_text: string;
  
    @IsNotEmpty()
    @IsEnum(['multiple_choice', 'true_false'])
    @IsOptional()
    question_type: 'multiple_choice' | 'true_false';
  
    @IsOptional()
    @IsUUID()
    created_by?: string;
  
    @IsOptional()
    @IsUUID()
    updated_by?: string;
  }
