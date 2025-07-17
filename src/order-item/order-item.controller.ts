import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { JwtAuthGuard } from 'src/guard/auth.guard';
import { SellerAuthGuard } from 'src/guard/seller.guard';
import { UserAuthGuard } from 'src/guard/user.guard';

@UseGuards(JwtAuthGuard, UserAuthGuard)
@Controller('order-item')
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}

  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto, @Req() req) {
    const userId = req.user['id'];
    return this.orderItemService.create(createOrderItemDto, userId);
  }

  @Get()
  findAll(@Req() req) {
    const userId = req.user.id;
    return this.orderItemService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    return this.orderItemService.findOne(+id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderItemDto: UpdateOrderItemDto, @Req() req) {
    const userId = req.user.id;
    return this.orderItemService.update(+id, updateOrderItemDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
  const userId = req.user.id;
    return this.orderItemService.remove(+id,userId );
  }
}
