// src/options/dto/update-option.dto.ts
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class UpdateOptionDto {
  @IsOptional()
  @IsString()
  question_id?: string;

  @IsOptional()
  @IsString()
  option_text?: string;

  @IsOptional()
  @IsBoolean()
  is_correct?: boolean;

  // You may include additional optional fields here, such as updated_by
}
