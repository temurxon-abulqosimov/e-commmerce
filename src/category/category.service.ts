import { Injectable, UseGuards } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AdminAuthGuard } from 'src/guard/admin.guard';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@UseGuards(AdminAuthGuard)
@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private readonly categoryRepository: Repository<Category>) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const data = await this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(data);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.categoryRepository.findOne({where: {id}});
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updateData = await this.categoryRepository.update(id, updateCategoryDto);
    return await this.categoryRepository.findOne({where: {id}});
  }

 async remove(id: number) {
   const removeData = await this.categoryRepository.delete(id);
   return {message: "Category deleted successfully"};
  }
}
