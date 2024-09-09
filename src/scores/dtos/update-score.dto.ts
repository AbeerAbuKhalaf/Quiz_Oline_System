import { IsUUID, IsInt, Min, IsOptional } from 'class-validator';

export class UpdateScoreDto {
  @IsOptional()
  @IsUUID()
  readonly user_id?: string;

  @IsOptional()
  @IsUUID()
  readonly quiz_id?: string;

  @IsOptional()
  @IsInt()
  @Min(0) // Assuming score should be a non-negative integer
  readonly score?: number;

  @IsOptional()
  @IsUUID()
  readonly updatedById?: string;
}
