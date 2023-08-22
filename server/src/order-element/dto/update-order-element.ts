import { IsOptional } from 'class-validator';

export class UpdateOrderElementDto {
  @IsOptional()
  productId: string;
  @IsOptional()
  amount: number;
  @IsOptional()
  sum: number;
}
