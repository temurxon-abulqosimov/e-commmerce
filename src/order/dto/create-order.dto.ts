import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { OrderStatus } from "../entities/order.entity";

//create uchun
export class CreateOrderDto {

  @IsNumber()
  @Type(() => Number)
  totalAmount: number;

  @IsString()
  status: OrderStatus;
}