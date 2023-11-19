import { IsEmail, IsNotEmpty } from "class-validator";

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