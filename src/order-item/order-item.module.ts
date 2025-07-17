import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { OrderItem } from './entities/order-item.entity';
import { Order } from 'src/order/entities/order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Product])], // Add your OrderItem entity here
  controllers: [OrderItemController],
  providers: [OrderItemService],
})
export class OrderItemModule {}
