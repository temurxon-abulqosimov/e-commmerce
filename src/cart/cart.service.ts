// src/cart/cart.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,
  ) {}

  async createCartForUser(user: User): Promise<Cart> {
    const newCart = this.cartRepo.create({ user });
    return this.cartRepo.save(newCart);
  }

  async getCartByUserId(userId: number): Promise<Cart> {
    const cart = await this.cartRepo.findOne({
      where: { user: { id: userId } },
      relations: ['items', 'items.product'], // itemlar va productlarni ob keladi
    });
    if (!cart) throw new NotFoundException('Cart not found');
    return cart;
  }

  async deleteCart(userId: number): Promise<void> {
    const cart = await this.getCartByUserId(userId);
    await this.cartRepo.remove(cart);
  }
};