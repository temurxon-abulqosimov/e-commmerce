// src/payments/payments.controller.ts
import { Controller, Post, Patch, Get, Param, Body, UseGuards } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { PaymentsService } from './payment.service';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  createPayment(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.create(dto);
  }

  @Patch(':id')
  updatePayment(@Param('id') id: string, @Body() dto: UpdatePaymentDto) {
    return this.paymentsService.updateStatus(+id, dto);
  }

  @Get('order/:orderId')
  getPaymentByOrder(@Param('orderId') orderId: string) {
    return this.paymentsService.getByOrderId(+orderId);
  }
}
