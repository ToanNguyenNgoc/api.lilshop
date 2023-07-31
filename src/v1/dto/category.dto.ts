import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateCategoryDTO {
  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  name_slugify!: string

  @IsNumber()
  tag_id!: number
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
}