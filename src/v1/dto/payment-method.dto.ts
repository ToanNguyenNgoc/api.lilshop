import { IsNotEmpty } from "class-validator";

export class CreatePaymentMethodDTO {
    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    method_key!: string;

}