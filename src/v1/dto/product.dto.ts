import {  IsNotEmpty, IsNumber, IsOptional } from "class-validator";

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

}