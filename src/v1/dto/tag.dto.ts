import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";

export class CreateTagDTO {
  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  name_slugify!: string

  @IsNotEmpty()
  type!: string
}

export class UpdateTagDTO {
  @IsOptional()
  name!: string

  @IsOptional()
  name_slugify!: string|undefined

  @IsOptional()
  type!: string

  @IsOptional()
  @IsBoolean()
  status!: boolean
}