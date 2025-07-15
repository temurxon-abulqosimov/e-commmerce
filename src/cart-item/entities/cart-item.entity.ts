import { Cart } from 'src/cart/entities/cart.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Cart, cart => cart.items, { onDelete: 'CASCADE' })
  cart: Cart;
}