import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { envVariables } from 'src/config/env.variables';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private   readonly  userRepo : Repository<User>) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepo.create(createUserDto);
    await this.userRepo.save(newUser);
    const token = jwt.sign(
      { sub: newUser.id}, 
     envVariables.JWT_SECRET,
      { expiresIn: '1h' }
    )
    

    return {message: 'User created successfully', user: newUser};
  }

  async findAll() {
    const users = await this.userRepo.find();
    if (users.length === 0) {
      throw new Error('No users found');
    }
    
    const seller = users.filter(user => user.role === 'seller');
    if( seller.length === 0) {
      throw new Error('No sellers found');
    }

    return seller
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    if(user.role === 'seller')  {
      return user
    }
    else {
      return {message: 'This user is not a seller'}
    }

  }

 async  update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    if(user.id !== id){
      throw new Error(`User id mismatch: expected ${id}, got ${user.id}`);
    }
    await this.userRepo.update(id, updateUserDto);
    return {message: `User with id ${id} updated successfully`};
  }

 async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    if(user.id !== id){
      throw new Error(`User id mismatch: expected ${id}, got ${user.id}`);
    }
    await this.userRepo.delete(id);

    return {message: `User with id ${id} deleted successfully`}
  }
}
