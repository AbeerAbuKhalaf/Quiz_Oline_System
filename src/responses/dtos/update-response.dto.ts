// src/responses/dto/update-response.dto.ts
import { IsString, IsOptional, IsUUID } from 'class-validator';

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

  // You may include additional optional fields here, such as updated_by.
}
