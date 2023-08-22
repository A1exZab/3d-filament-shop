import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @IsString()
  @IsOptional()
  readonly lastName?: string;

  @IsNotEmpty()
  @IsOptional()
  readonly email?: string;

  @IsString()
  @IsOptional()
  readonly password?: string;

  @IsOptional()
  readonly role?: 'USER' | 'ADMIN';

  @IsOptional()
  readonly refreshToken?: string | null;
}
