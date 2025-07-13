import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtAuthGuard } from 'src/guard/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto, @Req() req){
    const userId = req.user.id;
    const userRole = req.user.role;
    // console.log(userId, userRole);
    console.log(req.user);
    
    
    return this.wishlistService.create(createWishlistDto, userId, userRole);
  }

  @Get()
  findAll( @Req() req) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.wishlistService.findAll(userId, userRole);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const userId = req.user.id;
    const userRole = req.user.role;

    return this.wishlistService.findOne(+id, userId, userRole);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishlistDto: UpdateWishlistDto,  @Req() req) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.wishlistService.update(+id, updateWishlistDto, userId, userRole);
  }

  @Delete(':id')
  remove(@Param('id') id: string,  @Req() req ) {
    const userId = req.user.id;
    const userRole = req.user.role;
    return this.wishlistService.remove(+id, userId, userRole);
  }
}
