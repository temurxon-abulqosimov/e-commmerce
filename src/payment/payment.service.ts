import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,

    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  async create(dto: CreatePaymentDto): Promise<Payment> {
    const order = await this.orderRepo.findOne({
      where: { id: dto.orderId },
      relations: ['user'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const existing = await this.paymentRepo.findOne({
      where: { order: { id: dto.orderId } },
    });

    if (existing) {
      throw new BadRequestException(
        `Payment already exists for order ID ${dto.orderId}`,
      );
    }

    const payment = this.paymentRepo.create({
      order,
      amount: dto.amount,
    });

    return this.paymentRepo.save(payment);
  }

  async updateStatus(id: number, dto: UpdatePaymentDto): Promise<Payment> {
    const payment = await this.paymentRepo.findOneBy({ id });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    payment.status = dto.status;
    return this.paymentRepo.save(payment);
  }

  async getByOrderId(orderId: number): Promise<Payment> {
    const payment = await this.paymentRepo.findOne({
      where: { order: { id: orderId } },
      relations: ['order'],
    });

    if (!payment) {
      throw new NotFoundException('Payment not found for this order');
    }

    return payment;
  }
}