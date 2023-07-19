import { IsNotEmpty } from "class-validator";

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
}