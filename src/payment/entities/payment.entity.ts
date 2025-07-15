import { Order } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'paid' | 'failed' | 'refunded';

  @OneToOne(() => Order, { onDelete: 'CASCADE' })
  @JoinColumn()
  order: Order;
}
