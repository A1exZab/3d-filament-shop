import { IsOptional } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  name?: number;
  @IsOptional()
  price?: number;
  @IsOptional()
  amount?: number;
  @IsOptional()
  printSpeed?: string;
  @IsOptional()
  bedTemp?: string;
  @IsOptional()
  hotendTemp?: string;
  @IsOptional()
  diameter?: number;
  @IsOptional()
  weight?: number;
  @IsOptional()
  material?: string;
  @IsOptional()
  color?: string;
  @IsOptional()
  manufacturer?: string;
}
