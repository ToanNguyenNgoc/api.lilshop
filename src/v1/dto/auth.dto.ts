import { IsEmail, IsNotEmpty, IsOptional, Matches } from "class-validator";

export class LoginDTO {
  @IsNotEmpty()
  email!: string

  @IsNotEmpty()
  password!: string
}
export class RegisterDTO {
  @IsNotEmpty()
  fullname!: string

  @IsNotEmpty()
  telephone!: string

  @IsNotEmpty()
  email!: string

  @IsNotEmpty()
  password!: string

  manager!:boolean

  verify!:boolean
}
export class LoginGoogleMobaDTO{
  @IsNotEmpty()
  @IsEmail()
  email!:string;

  @IsNotEmpty()
  server_auth_code!:string
}
export class UserGoogle{
  fullname!:string;
  email!:string;
  avatar!:string;
  social_platform!:string
  password!: string
}
export class PutProfileDTO{
  @IsOptional()
  fullname!:string;

  @IsOptional()
  telephone!:string;

  @IsOptional()
  @Matches(/\.(jpg|jpeg|png|gif|bmp|webp|HEIC|PNG)$/, { message: 'Image url is not match link' })
  avatar!:string;
}

export class ForgotMobaDTO{
  @IsNotEmpty()
  recaptcha!:string

  @IsNotEmpty()
  @IsEmail()
  email!:string

  @IsOptional()
  new_password!:string

  @IsOptional()
  code!:string
}