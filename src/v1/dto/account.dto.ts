import { IsArray, IsBoolean, IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";

export class CreateAccountDTO {
  @IsNotEmpty()
  fullname!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsOptional()
  @Matches(/\.(jpg|jpeg|png|gif|bmp|webp|HEIC|PNG)$/, { message: 'Avatar is not match link' })
  avatar!: string

  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  telephone!: string;


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
  telephone!: string

  @IsOptional()
  @Matches(/\.(jpg|jpeg|png|gif|bmp|webp|HEIC|PNG)$/, { message: 'Avatar is not match link' })
  avatar!: string


  @IsOptional()
  @IsBoolean()
  status!: boolean

  @IsOptional()
  @IsArray()
  roles!: Array<number>
}
export class ForgotPassword{
  @IsNotEmpty()
  password!:string
}