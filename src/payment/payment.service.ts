import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment, PaymentStatus } from './entities/payment.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,

    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

  @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async create(dto: CreatePaymentDto) {
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

    const amount = order.totalAmount;

    const payment = this.paymentRepo.create({
      ...dto,
      order,
      amount: amount,
    });

    if( payment.status !== PaymentStatus.PAID) {
      for (let i = 0; i < order.items.length; i++) {
        const product = await this.productRepo.findOne({ where: { id: order.items[i].product.id } });
        if (!product) {
          throw new NotFoundException(`Product with ID ${order.items[i].product.id} not found`);
        }
        const newProduct = this.productRepo.update(product.id, {
          quantity : product.quantity - order.items[i].quantity,
        }
        )
      }
      }
    return this.paymentRepo.save(payment);
  }

  async updateStatus(id: number, dto: UpdatePaymentDto) {
    const payment = await this.paymentRepo.findOneBy({ id });
    const order = await this.orderRepo.findOne({
      where: { id: dto.orderId },
      relations: ['user'],
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    payment.status = dto.status as PaymentStatus;
    await this.paymentRepo.save(payment);

    for (let i = 0; i < order.items.length; i++) {
      const product = await this.productRepo.findOne({ where: { id: order.items[i].product.id } });
      if (!product) {
        throw new NotFoundException(`Product with ID ${order.items[i].product.id} not found`);
      }
      const newProduct = this.productRepo.update(product.id, {
        quantity : product.quantity - order.items[i].quantity,
      }
      )
    }

    return {message: 'Payment status updated successfully', payment};
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