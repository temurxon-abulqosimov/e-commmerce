import { BadRequestException, Injectable } from '@nestjs/common';
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
    const newUser = this.userRepo.create({...createUserDto, address:{}});
    await this.userRepo.save(newUser);
    const token = jwt.sign(
      { id: newUser.id, role: newUser.role }, 
     envVariables.JWT_SECRET,
      { expiresIn: '1h' }
    )
    

    return {message: 'User created successfully', user: newUser, token: token};
  }

   async login(createUserDto) {
    
    const user = await this.userRepo.findOne({ where: { email: createUserDto.email} });
    
    if (!user || user.password != createUserDto.password) {
      throw new BadRequestException('Invalid email or password');
    }


    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      envVariables.JWT_SECRET,
      { expiresIn: '1h' }
    )

    return {message: 'Login successful', user, token};
  }


  async findAll() {
    const users = await this.userRepo.find();
    if (users.length === 0) {
      throw new BadRequestException('No users found');
    }
    
    const seller = users.filter(user => user.role === 'seller');
    if( seller.length === 0) {
      throw new BadRequestException('No sellers found');
    }

    return seller
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });

    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
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
      throw new BadRequestException(`User with id ${id} not found`);
    }
    if(user.id !== id){
      throw new BadRequestException(`User id mismatch: expected ${id}, got ${user.id}`);
    }
    await this.userRepo.update(id,{ ...updateUserDto, address:{}});
    return {message: `User with id ${id} updated successfully`};
  }

 async remove(id: number) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException(`User with id ${id} not found`);
    }
    if(user.id !== id){
      throw new BadRequestException(`User id mismatch: expected ${id}, got ${user.id}`);
    }
    await this.userRepo.delete(id);

    return {message: `User with id ${id} deleted successfully`}
  }
}
