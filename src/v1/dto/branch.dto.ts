import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { isFloat32Array } from "util/types";

export class CreateBranchDTO {
  @IsNotEmpty()
  name!: string

  media_id!: number

  @IsNotEmpty()
  short_address!: string

  @IsNotEmpty()
  @IsNumber()
  province_code!: number

  @IsNotEmpty()
  @IsNumber()
  district_code!: number

  @IsNotEmpty()
  @IsNumber()
  ward_code!: number

  @IsOptional()
  @IsString()
  hotline!: string

  @IsOptional()
  @IsEmail()
  email!: string

  @IsOptional()
  lat!: number

  @IsOptional()
  long!: number
}
export class UpdateBranchDTO {
  @IsOptional()
  name!: string

  @IsOptional()
  @IsNumber()
  media_id!: number

  @IsOptional()
  short_address!: string

  @IsOptional()
  @IsNumber()
  province_code!: number

  @IsOptional()
  @IsNumber()
  district_code!: number

  @IsOptional()
  @IsNumber()
  ward_code!: number

  @IsOptional()
  @IsString()
  hotline!: string

  @IsOptional()
  @IsEmail()
  email!: string

  @IsOptional()
  lat!: number

  @IsOptional()
  long!: number

  @IsOptional()
  @IsBoolean()
  status!: boolean
}