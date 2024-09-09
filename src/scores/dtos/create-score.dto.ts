import { IsNotEmpty, IsUUID, IsInt, Min } from 'class-validator';

export class CreateScoreDto {
  @IsNotEmpty()
  @IsUUID()
  readonly user_id: string;

  @IsNotEmpty()
  @IsUUID()
  readonly quiz_id: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0) // Assuming score should be a non-negative integer
  readonly score: number;

  @IsNotEmpty()
  @IsUUID()
  readonly createdById: string;

  @IsNotEmpty()
  @IsUUID()
  readonly updatedById: string;
}
