import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { PaymentStatus } from "../entities/payment.entity";

export class CreatePaymentDto {

  @IsNumber()
  @Type(() => Number)
  orderId: number;

  @IsNumber()
  @Type(() => Number)
  amount: number;

  @IsString()
  status: PaymentStatus;
}
