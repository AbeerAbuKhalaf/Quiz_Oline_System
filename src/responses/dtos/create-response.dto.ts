// src/responses/dto/create-response.dto.ts
import { IsString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateResponseDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsUUID()
  @IsNotEmpty()
  quiz_id: string;

  @IsUUID()
  @IsNotEmpty()
  question_id: string;

  @IsUUID()
  @IsNotEmpty()
  selected_option_id: string;

  // You can include additional optional fields if needed, such as created_by or updated_by.
  @IsUUID()
  @IsNotEmpty()
  created_by: string;

  @IsUUID()
  @IsNotEmpty()
  updated_by: string;
}
