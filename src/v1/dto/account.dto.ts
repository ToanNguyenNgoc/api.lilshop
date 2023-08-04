import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";

export class CreateAccountDTO {
  @IsNotEmpty()
  fullname!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsOptional()
  @Matches(/\.(jpg|jpeg|png|gif|bmp)$/, { message: 'Avatar is not match link' })
  avatar!: string

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  telephone!: string;

  full_address!: string;

  @IsArray()
  roles!: Array<number>;
}

export class UpdateAccountDTO {
  @IsOptional()
  fullname!: string;

  @IsOptional()
  @IsEmail()
  email!: string

  @IsOptional()
  @IsEmail()
  telephone!: string

  @IsOptional()
  @Matches(/\.(jpg|jpeg|png|gif|bmp)$/, { message: 'Avatar is not match link' })
  avatar!: string

  @IsOptional()
  full_address!: string

  @IsOptional()
  @IsBoolean()
  status!: boolean

  @IsOptional()
  @IsArray()
  roles!: Array<number>
}