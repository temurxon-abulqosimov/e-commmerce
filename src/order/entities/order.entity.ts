// src/orders/order.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { User } from 'src/users/entities/user.entity';
import { UserAddress } from 'src/user-address/entities/user-address.entity';


export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  totalAmount: number;

  @Column({ default: 'pending' })
  status: OrderStatus;

  @ManyToOne(() => User, (user) => user.orders)
  user: User  ;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  items: OrderItem[];

  @OneToOne(() => UserAddress, userAdresss => userAdresss.order ,{ eager: true })
  address: UserAddress
  
}
