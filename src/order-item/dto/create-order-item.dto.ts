import { Type } from "class-transformer";
import { IsNumber } from "class-validator";

export class CreateOrderItemDto {
    
    @IsNumber()
    @Type(() => Number)
    quatity: number;

    @IsNumber()
    @Type(() => Number)
    price: number;

    @IsNumber()
    @Type(() => Number)
    productId: number;

    @IsNumber()
    @Type(() => Number)
    orderId: number;
}
