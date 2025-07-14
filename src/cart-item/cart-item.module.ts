// src/cart-item/cart-item.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './cart-item.entity';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { Product } from '../products/product.entity';
import { Cart } from '../cart/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem, Product, Cart])],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
