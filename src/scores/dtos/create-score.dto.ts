import { IsNotEmpty, IsUUID, IsInt, Min } from 'class-validator';

export class CreateScoreDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsUUID()
  quiz_id: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0) // Assuming score should be a non-negative integer
  score: number;
  
  @IsUUID()
  @IsNotEmpty()
  created_by: string;

  @IsUUID()
  @IsNotEmpty()
  updated_by: string;
}
