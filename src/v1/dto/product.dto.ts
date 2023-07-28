import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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

  @IsOptional()
  @IsArray()
  media_ids!: Array<number>
}