import { IsString, IsNotEmpty } from 'class-validator';

export class CreateManufacturerDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
