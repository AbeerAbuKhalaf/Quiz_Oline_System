// src/options/dto/create-option.dto.ts
import { IsString, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateOptionDto {
  @IsString()
  @IsNotEmpty()
  question_id: string;

  @IsString()
  @IsNotEmpty()
  option_text: string;

  @IsBoolean()
  is_correct: boolean;

  // You may also include optional fields here, such as created_by or updated_by
  // depending on whether you allow setting them during creation or handle them automatically.
}
