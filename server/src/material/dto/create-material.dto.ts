import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMaterialDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
