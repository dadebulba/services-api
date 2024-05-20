import { IsOptional, IsString, IsInt, Min, IsIn, Max } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAllQueryDTO {
  @IsOptional()
  @IsInt({ message: 'Offset must be an integer' })
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @Min(0, { message: 'Offset must be a non-negative integer' })
  offset?: number;

  @IsOptional()
  @IsInt({ message: 'Limit must be an integer' })
  @Transform(({ value }) => parseInt(value, 10), { toClassOnly: true })
  @Min(1, { message: 'Limit must be a positive integer' })
  @Max(100, { message: 'Limit must not be over 100'})
  limit?: number;

  @IsOptional()
  @IsString({ message: 'Search must be a string' })
  search?: string;

  @IsOptional()
  @IsString({ message: 'Sort must be a string' })
  sort?: string;

  @IsOptional()
  @IsIn(['ASC', 'DESC'], { message: 'Order must be either ASC or DESC' })
  order?: 'ASC' | 'DESC';
}