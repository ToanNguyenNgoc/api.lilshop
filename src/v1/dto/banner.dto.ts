import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, Matches } from "class-validator";
import { BANNER_TYPE } from "~/constants";

export class CreateBannerDTO {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  @Matches(/\.(jpg|jpeg|png|gif|bmp|webp|HEIC|PNG)$/, { message: 'Image url is not match link' })
  image_url!: string;

  @IsNotEmpty()
  @IsIn(BANNER_TYPE)
  type!: string

  @IsOptional()
  product_id!: number

  @IsOptional()
  html_template!: string

  @IsOptional()
  url!: string

  @IsOptional()
  keyword!: string

  @IsNumber()
  priority!: number
}
export class UpdateBannerDTO {
  @IsOptional()
  name!: string;

  @IsOptional()
  @Matches(/\.(jpg|jpeg|png|gif|bmp|webp|HEIC|PNG)$/, { message: 'Image url is not match link' })
  image_url!: string;

  @IsOptional()
  @IsIn(BANNER_TYPE)
  type!: string

  @IsOptional()
  product_id!: number

  @IsOptional()
  html_template!: string

  @IsOptional()
  url!: string

  @IsOptional()
  keyword!: string

  @IsOptional()
  @IsNumber()
  priority!: number

  @IsOptional()
  @IsBoolean()
  status!: boolean
}