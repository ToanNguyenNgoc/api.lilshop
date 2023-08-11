import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateCustomerAddressDTO {
    @IsNotEmpty()
    consignee_s_name!:string;

    @IsNotEmpty()
    consignee_s_telephone!:string;

    @IsNotEmpty()
    short_address!: string;

    @IsNumber()
    province_code!: number;

    @IsNumber()
    district_code!: number;

    @IsNumber()
    ward_code!: number;

    @IsBoolean()
    is_default!: boolean;

    @IsOptional()
    lat!: number

    @IsOptional()
    long!: number
}
export class UpdateCustomerAddressDTO {
    @IsOptional()
    consignee_s_name!:string;

    @IsOptional()
    consignee_s_telephone!:string;

    @IsOptional()
    short_address!: string;

    @IsOptional()
    @IsNumber()
    province_code!: number;

    @IsOptional()
    @IsNumber()
    district_code!: number;

    @IsOptional()
    @IsNumber()
    ward_code!: number;

    @IsOptional()
    @IsBoolean()
    is_default!: boolean;

    @IsOptional()
    lat!: number

    @IsOptional()
    long!: number

    @IsOptional()
    @IsBoolean()
    status!: boolean
}