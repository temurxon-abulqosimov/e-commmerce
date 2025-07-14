// src/cart/cart.controller.ts
import { Controller, Get, Delete, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtAuthGuard } from '../src/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getMyCart(@Req() req: Request) {
    const userId = req.users['id'];
    return this.cartService.getCartByUserId(userId);
  }

  @Delete()
  deleteMyCart(@Req() req: Request) {
    const userId = req.users['id'];
    return this.cartService.deleteCart(userId);
  }
}