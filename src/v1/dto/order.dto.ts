import { IsArray, IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ORDER_DELIVERY } from "~/constants";

export class UpdateOrderDTO {

  @IsOptional()
  @IsBoolean()
  confirm!: boolean

  @IsOptional()
  note!: string

  @IsArray()
  products!: Array<{
    id: number;
    branch_id: number;
    product_id: number;
    quantity: number;
    product_size_id: number
  }>
}

export class CreateOrderDeliveryDTO {
  @IsIn([
    ORDER_DELIVERY.INIT.key, ORDER_DELIVERY.CONF.key,
    ORDER_DELIVERY.SHIP.key, ORDER_DELIVERY.SUCCESS.key, ORDER_DELIVERY.REJECT.key, ORDER_DELIVERY.REFUND.key
  ])
  status_name!: string;

  @IsNotEmpty()
  note!: string
}