import { IsOptional } from 'class-validator';

export class UpdateOrderDto {
  @IsOptional()
  status: 'NEW' | 'PROCESSED';

  @IsOptional()
  sum: number;

  @IsOptional()
  address: string;

  @IsOptional()
  delivery: string;
}
