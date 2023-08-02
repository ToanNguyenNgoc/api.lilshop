import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateProductDTO {
  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  name_slugify!: string

  @IsNumber()
  price_original!: number

  @IsNumber()
  price!: number

  @IsOptional()
  @IsNumber()
  price_special!: number;

  @IsOptional()
  short_content!: string;

  @IsNumber()
  tag_id!: number;

  @IsNumber()
  category_id!: number
}

export class UpdateProductDTO {
  @IsOptional()
  name!: string

  @IsOptional()
  name_slugify!: string

  @IsOptional()
  @IsNumber()
  price_original!: number

  @IsOptional()
  @IsNumber()
  price!: number

  @IsOptional()
  @IsNumber()
  price_special!: number;

  @IsOptional()
  short_content!: string;

  @IsOptional()
  tag_id!: number

  @IsOptional()
  category_id!: number
}
export class ProductSizeDTO {
  @IsNotEmpty()
  name!: string
}
export class UpdateProductSizeDTO {
  @IsOptional()
  name!: string;

  @IsOptional()
  @IsBoolean()
  status!: boolean
}
export class CreateProductBranchDTO {
  @IsNumber()
  branch_id!: number;

  @IsNumber()
  quantity!: number
}

export class UpdateProductBranchDTO {
  @IsOptional()
  quantity!: number

  @IsOptional()
  @IsBoolean()
  status!: boolean
}