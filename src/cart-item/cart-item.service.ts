// src/cart-item/cart-item.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from './cart-item.entity';
import { Repository } from 'typeorm';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { Product } from '../products/product.entity';
import { Cart } from '../cart/cart.entity';

@Injectable()
export class CartItemService {
  constructor(
    @InjectRepository(CartItem)
    private cartItemRepo: Repository<CartItem>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(Cart)
    private cartRepo: Repository<Cart>,
  ) {}

  async addItem(userId: number, dto: CreateCartItemDto): Promise<CartItem> {
    const cart = await this.cartRepo.findOne({ where: { user: { id: userId } } });
    if (!cart) throw new NotFoundException('Cart not found');

    const product = await this.productRepo.findOneBy({ id: dto.productId });
    if (!product) throw new NotFoundException('Product not found');

    const existing = await this.cartItemRepo.findOne({
      where: { cart: { id: cart.id }, product: { id: dto.productId } },
    });

    if (existing) {
      existing.quantity += dto.quantity;
      return this.cartItemRepo.save(existing);
    }

    const newItem = this.cartItemRepo.create({ cart, product, quantity: dto.quantity });
    return this.cartItemRepo.save(newItem);
  }

  async updateItem(id: number, dto: UpdateCartItemDto): Promise<CartItem> {
    const item = await this.cartItemRepo.findOneBy({ id });
    if (!item) throw new NotFoundException('Item not found');
    item.quantity = dto.quantity;
    return this.cartItemRepo.save(item);
  }

  async removeItem(id: number): Promise<void> {
    const item = await this.cartItemRepo.findOneBy({ id });
    if (!item) throw new NotFoundException('Item not found');
    await this.cartItemRepo.remove(item);
  }
}
