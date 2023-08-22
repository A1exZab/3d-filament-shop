import { IsNotEmpty } from 'class-validator';

export class CreateOrderElementDto {
  @IsNotEmpty()
  orderId: string;

  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  sum: number;

  @IsNotEmpty()
  amount: number;
}
