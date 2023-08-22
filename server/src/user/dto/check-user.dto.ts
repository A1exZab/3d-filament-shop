import { IsNotEmpty } from 'class-validator';

export class CheckUserDto {
  @IsNotEmpty()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
}
