// src/orders/orders.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { Cart } from '../cart/cart.entity';
import { CartItem } from '../cart-item/cart-item.entity';
import { OrderItem } from './order-item.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem)
    private orderItemRepo: Repository<OrderItem>,
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,
    @InjectRepository(CartItem)
    private cartItemRepo: Repository<CartItem>,
  ) {}

  async createOrder(userId: number): Promise<Order> {
    const cart = await this.cartRepo.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
    });

    if (!cart || !cart.items.length) {
      throw new NotFoundException('Cart is empty');
    }

    const order = this.orderRepo.create({
      user: { id: userId },
      items: cart.items.map((item) =>
        this.orderItemRepo.create({
          product: item.product,
          quantity: item.quantity,
        }),
      ),
      status: 'pending',
    });

    const savedOrder = await this.orderRepo.save(order);
    await this.cartItemRepo.remove(cart.items); // savatni tozalashga

    return savedOrder;
  }

  async getMyOrders(userId: number): Promise<Order[]> {
    return this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'],
      order: { createdAt: 'DESC' },
    });
  }

  async updateStatus(orderId: number, status: string): Promise<Order> {
    const order = await this.orderRepo.findOneBy({ id: orderId });
    if (!order) throw new NotFoundException('Order not found');
    order.status = status as any;
    return this.orderRepo.save(order);
  }
}