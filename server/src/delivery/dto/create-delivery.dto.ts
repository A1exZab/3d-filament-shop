import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateDeliveryDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  readonly price: number;
}
