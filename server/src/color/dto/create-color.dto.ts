import { IsString, IsNotEmpty, Matches } from 'class-validator';

export class CreateColorDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g, {
    message: 'Код не соответствует HEX формату',
  })
  readonly code: string;
}
