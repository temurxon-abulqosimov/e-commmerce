import { Injectable } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderItemService {
  constructor(@InjectRepository(OrderItem) private readonly orderItemRepo : Repository<OrderItem>) {}
  async create(createOrderItemDto: CreateOrderItemDto, userId: number) {
      
    const newOrderItem = this.orderItemRepo.create({
      ...createOrderItemDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.orderItemRepo.save(newOrderItem);
    return {message: 'Order item created successfully', orderItem: newOrderItem};
  }

 async findAll(userId: number) {
   
    const orderItems = await this.orderItemRepo.find({
      relations: ['product', 'order'],
      order: { createdAt: 'DESC' },
    });
    if (!orderItems || orderItems.length === 0) {
      return { message: 'No order items found' };
    }
    const id = orderItems.map( item => item.order.user.id)
       if (!id.includes(userId)) {
         return { message: 'You do not have permission to view these order items' };
       }


    return orderItems ;
  }

 async findOne(id: number, userId: number) {
    const orderItem = await this.orderItemRepo.findOne({
      where: { id },
      relations: ['product', 'order'],
    });
    if (!orderItem) {
      return { message: 'Order item not found' };
    }
    const orderItemId = orderItem.order.user.id;
    if (orderItemId !== userId) {
      return { message: 'You do not have permission to view this order item' };
    }


    return orderItem;
  }

 async update(id: number, updateOrderItemDto: UpdateOrderItemDto, userId: number) {
    const orderItem = await this.orderItemRepo.findOne({ where: { id } });
    if (!orderItem) {
      return { message: 'Order item not found' };
    }
    if(orderItem.order.user.id !== userId) {
      return { message: 'You do not have permission to update this order item' };
    }
    await this.orderItemRepo.update(id, {
      ...updateOrderItemDto,
      updatedAt: new Date(),
    });

    return { message: 'Order item updated successfully', orderItemId: id };
  }

  async remove(id: number, userId: number) {
    const orderItem = await this.orderItemRepo.findOne({ where: { id } });
    if (!orderItem) {
      return { message: 'Order item not found' };
    }
    if(orderItem.order.user.id !== userId) {
      return { message: 'You do not have permission to delete this order item' };
    }
    
    await this.orderItemRepo.delete(id);

    return { message: 'Order item deleted successfully', orderItemId: id};
}
}
