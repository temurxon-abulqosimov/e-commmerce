// src/cart-item/cart-item.controller.ts
import { Controller, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('cart-items')
@UseGuards(JwtAuthGuard)
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post()
  addItem(@Body() dto: CreateCartItemDto, @Req() req: Request) {
    const userId = req.user['id'];
    return this.cartItemService.addItem(userId, dto);
  }

  @Patch(':id')
  updateItem(@Param('id') id: string, @Body() dto: UpdateCartItemDto) {
    return this.cartItemService.updateItem(+id, dto);
  }

  @Delete(':id')
  removeItem(@Param('id') id: string) {
    return this.cartItemService.removeItem(+id);
  }
};