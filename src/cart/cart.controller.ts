// src/cart/cart.controller.ts
import { Controller, Get, Delete, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/guard/auth.guard';

@Controller('cart')
@UseGuards(JwtAuthGuard)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  getMyCart(@Req() req: Request) {
    const userId = req.user['id'];
    return this.cartService.getCartByUserId(userId);
  }



  @Delete()
  deleteMyCart(@Req() req: Request) {
    const userId = req.user['id'];
    return this.cartService.deleteCart(userId);
  }
}