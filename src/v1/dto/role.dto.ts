import { IsArray, IsBoolean, IsEmpty, IsNotEmpty, IsOptional } from "class-validator"

export class RoleDTO {
  @IsNotEmpty()
  name!: string;

  @IsArray()
  permissions!: Array<number>
}
export class UpdateRoleDto {
  @IsOptional()
  name!:string;

  @IsOptional()
  @IsBoolean()
  status!: boolean

  @IsOptional()
  @IsArray()
  permissions!: Array<number>
}