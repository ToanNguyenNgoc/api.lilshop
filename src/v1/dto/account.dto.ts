import { IsArray, IsBoolean, IsEmail, IsOptional } from "class-validator";

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
  @IsBoolean()
  status!: boolean

  @IsOptional()
  @IsArray()
  roles!: Array<number>
}