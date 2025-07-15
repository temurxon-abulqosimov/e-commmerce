// src/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../order/entities/order.entity';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { CartItem } from 'src/cart-item/entities/cart-item.entity';
import { OrdersService } from './order.service';
import { OrdersController } from './order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Cart, CartItem])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
