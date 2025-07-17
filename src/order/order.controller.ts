// src/orders/orders.controller.ts
import { Controller, Post, Get, Patch, Param, Body, Req, UseGuards, Delete } from '@nestjs/common';

import { JwtAuthGuard } from 'src/guard/auth.guard';
import { OrdersService } from './order.service';
import { UserAuthGuard } from 'src/guard/user.guard';

@UseGuards(JwtAuthGuard)
@UseGuards(UserAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('checkout')
  checkout(@Req() req) { 
    const userId = req.user['id'];

    return this.ordersService.createOrder(userId);
  }

  @Get()
  getMyOrders(@Req() req) {
    const userId = req.user.id;
    return this.ordersService.getMyOrders(userId);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string, @Req() req) {
    const userId = req.user.id;
    return this.ordersService.updateStatus(+id, status, userId);
  }

  @Delete(':id')
  deleteOrder(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.ordersService.deleteOrder(+id, userId);
  }
  
};