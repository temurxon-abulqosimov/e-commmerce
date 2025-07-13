import { Injectable } from '@nestjs/common';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { UserRole } from 'src/users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistService {
  constructor(@InjectRepository(Wishlist) private   readonly  wishlistRepo : Repository<Wishlist>) {}
 async create(createWishlistDto: CreateWishlistDto, userId: number, userRole: UserRole ) {
    if(userRole !== UserRole.USER) {
      return 'Only users can create a wishlist';
    }
    const newWishlist = this.wishlistRepo.create({
      ...createWishlistDto,
      userId: userId,   
    })
    await this.wishlistRepo.save(newWishlist);
    return  {message: 'Wishlist created successfully', wishlist: newWishlist};
}

async  findAll( userId: number, userRole: UserRole) {

    if(userRole !== UserRole.ADMIN) {
      return 'Only users can view wishlists';
    }
    const wishlists =  await this.wishlistRepo.find();
    if (wishlists.length === 0) {
      return 'No wishlists found';
    }

    return wishlists;
  }

  async findOne(id: number,  userId: number, userRole: UserRole) {
    const wishlist = await this.wishlistRepo.findOne({ where: { id } });

    if (!wishlist) {
      return `Wishlist with id ${id} not found`;
    }
    if(wishlist.userId !== userId) {
      return 'This wishlist does not belong to the user';
    }
    if(userRole === UserRole.SELLER) {
      return 'Sellers cannot view wishlists';
    }

    return wishlist;
  }

 async update(id: number, updateWishlistDto: UpdateWishlistDto,  userId: number, userRole: UserRole) {
    const wishlist = await this.wishlistRepo.findOne({ where: { id } });
    if (!wishlist) {
      return `Wishlist with id ${id} not found`;
    }
    if(wishlist.userId !== userId) {
      return 'This wishlist does not belong to the user';
    }
    const updatedWishlist = await this.wishlistRepo.update(id, updateWishlistDto);

    

    return {message: 'Wishlist updated successfully', wishlist: updatedWishlist};
  }

  async remove(id: number,  userId: number, userRole: UserRole) {
    const wishlist = await this.wishlistRepo.findOne({ where: { id } });
    if (!wishlist) {
      return `Wishlist with id ${id} not found`;
    }
    if(wishlist.userId !== userId) {
      return 'This wishlist does not belong to the user';
    }
   await  this.wishlistRepo.delete(id);
    return {message: `Wishlist with id ${id} deleted successfully`};
  }
}
