// src/orders/orders.controller.ts
import { Controller, Post, Get, Patch, Param, Body, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  checkout(@Req() req: Request) {
    const userId = req.user['id'];
    return this.ordersService.createOrder(userId);
  }

  @Get()
  getMyOrders(@Req() req: Request) {
    const userId = req.user['id'];
    return this.ordersService.getMyOrders(userId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.updateStatus(+id, status);
  }
};