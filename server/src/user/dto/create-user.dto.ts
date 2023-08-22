import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsString,
  Matches,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'Email введен некорректно',
    },
  )
  readonly email: string;

  @IsString()
  @Matches(/\d+/g, {
    message: 'Пароль должен содержать числовые значения',
  })
  @Matches(/\p{Lu}+/gu, {
    message: 'Пароль должен содержать хотя бы одну заглавную букву]',
  })
  @MinLength(8, {
    message: 'Пароль должен содержать не менее 8-и символов',
  })
  @MaxLength(16, {
    message: 'Пароль должен содержать не более 16-и символов',
  })
  readonly password: string;

  @IsOptional()
  readonly role?: 'USER' | 'ADMIN';

  @IsOptional()
  readonly refreshToken?: string | null;
}
