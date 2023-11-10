import { IsBoolean, IsEmpty, IsNotEmpty, IsNumber, IsOptional, Matches } from "class-validator";

export class CreateCategoryDTO {
  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  name_slugify!: string

  @IsNumber()
  tag_id!: number

  @IsOptional()
  @Matches(/\.(jpg|jpeg|png|gif|bmp|webp|HEIC|PNG)$/, { message: 'Avatar is not match link' })
  image_url!:string
}

export class UpdateCategoryDTO {
  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  name_slugify!: string

  @IsNumber()
  tag_id!: number

  @IsOptional()
  @IsBoolean()
  status!: boolean

  @IsOptional()
  @Matches(/\.(jpg|jpeg|png|gif|bmp|webp|HEIC|PNG)$/, { message: 'Avatar is not match link' })
  image_url!:string
}