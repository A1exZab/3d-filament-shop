import { IsOptional } from 'class-validator';

export class UpdateProductAmountDto {
  @IsOptional()
  amount?: number;
}
