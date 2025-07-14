import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {

  constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

  async create(createProductDto: CreateProductDto) {
    const data = await this.productRepository.create(createProductDto);
    return this.productRepository.save(data);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    return await this.productRepository.findOne({where: {id}});
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const data = await this.productRepository.update(id, updateProductDto);
    return await this.productRepository.findOne({where: {id}});
  }

  async remove(id: number) {
    const data = await this.productRepository.delete(id);
    return {message: "Product deleted successfully"};
  }
}
