import { IsUUID, IsInt, Min, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateScoreDto {
  @IsOptional()
  @IsUUID()
  user_id?: string;

  @IsOptional()
  @IsUUID()
   quiz_id?: string;

  @IsOptional()
  @IsInt()
  @Min(0) // Assuming score should be a non-negative integer
   score?: number;

  @IsUUID()
  @IsNotEmpty()
  created_by: string;

  @IsUUID()
  @IsNotEmpty()
  updated_by: string;
}
