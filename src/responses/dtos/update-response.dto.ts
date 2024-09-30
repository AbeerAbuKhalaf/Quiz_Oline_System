// src/responses/dto/update-response.dto.ts
import { IsString, IsOptional, IsUUID, IsNotEmpty } from 'class-validator';

export class UpdateResponseDto {
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @IsOptional()
  @IsUUID()
  quiz_id?: string;

  @IsOptional()
  @IsUUID()
  question_id?: string;

  @IsOptional()
  @IsUUID()
  selected_option_id?: string;
  
  @IsUUID()
  @IsNotEmpty()
  created_by: string;

  @IsUUID()
  @IsNotEmpty()
  updated_by: string;

  // You may include additional optional fields here, such as updated_by.
}
