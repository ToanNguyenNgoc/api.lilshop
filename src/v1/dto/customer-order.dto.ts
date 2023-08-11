import { ArrayMinSize, IsArray, IsNumber, ValidateNested } from "class-validator";

class OrderProductIds {
    @IsNumber()
    product_id!: number;

    @IsNumber()
    quantity!: number;

    @IsNumber()
    product_size_id!: number
}
export class CreateCustomerOrderDTO {
    @IsNumber()
    address_id!: number;

    @IsNumber()
    payment_method_id!: number;

    @ValidateNested({ each: true })
    @ArrayMinSize(1)
    @IsArray()
    product_ids!: OrderProductIds[]
}