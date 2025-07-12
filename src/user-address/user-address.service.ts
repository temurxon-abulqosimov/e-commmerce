import { Injectable } from '@nestjs/common';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAddress } from './entities/user-address.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UserAddressService {
  constructor(@InjectRepository(UserAddress) private   readonly  userAddressRepo : Repository<UserAddress>,
   @InjectRepository(User) private   readonly  userRepo : Repository<User>) {}
 
 async create(createUserAddressDto: CreateUserAddressDto, id: number) {
    const user = await this.userRepo.findOne({ where: { id: id } });
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    if (user.addressId) {
      throw new Error(`User with id ${id} already has an address`);
    }   

    const newAddress = this.userAddressRepo.create({
      ...createUserAddressDto, 
    userId: {
      id 
    }});

    await this.userAddressRepo.save(newAddress)
    return {message: 'User address created successfully', userAddress: newAddress}; 
  }

 async findAll( id: number, role: string) {
    if (role !== 'admin') {
      throw new Error('Only admins can view user addresses');
    }
    const userAddresses = await this.userAddressRepo.find();
    if (userAddresses.length === 0) {
      throw new Error('No user addresses found');
    }
    return userAddresses;

  }

 async findOne(id: number, userId: number) {
    const userAddress = await this.userAddressRepo.findOne({where : { userId: { id } }});
    if (!userAddress) {
      throw new Error(`User address with id ${id} not found for user ${userId}`);
    }
    if (userAddress.userId.id !== userId) {
      throw new Error(`User address with id ${userAddress.userId.id} does not belong to user ${userId}`);
    }
    return userAddress;
  }

  async update(id: number, updateUserAddressDto: UpdateUserAddressDto, userId: number) {
    const userAddress = await this.userAddressRepo.findOne({ where: { userId: { id } } });
    if (!userAddress) {
      throw new Error(`User address with id ${id} not found`);
    }
    if (userAddress.userId.id !== userId) {
      throw new Error(`User address with id ${userAddress.userId.id} does not belong to user ${userId}`);
    }

    const updatedAddress = await this.userAddressRepo.update(userAddress, {...updateUserAddressDto, userId: { id: userId }});
    return {message: 'User address updated successfully', userAddress: updatedAddress};
  }

  async remove(id: number, userId : number) {
    const userAddress = await this.userAddressRepo.findOne({ where: { userId: { id } } });
    
    if (!userAddress) {
      throw new Error(`User address with id ${id} not found`);
    }
    if (userAddress.userId.id !== userId) {
      throw new Error(`User address with id ${userAddress.userId.id} does not belong to user ${userId}`);
    }
   await  this.userAddressRepo.delete({ userId: { id } });
    return {messahe: `User address with id ${id} deleted successfully`};
  }
}

