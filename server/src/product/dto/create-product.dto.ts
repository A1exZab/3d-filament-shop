import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  name: number;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  amount: number;

  @IsNotEmpty()
  printSpeed: string;

  @IsNotEmpty()
  bedTemp: string;

  @IsNotEmpty()
  hotendTemp: string;

  @IsNotEmpty()
  diameter: number;

  @IsNotEmpty()
  weight: number;

  @IsNotEmpty()
  material: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  manufacturer: string;
}
