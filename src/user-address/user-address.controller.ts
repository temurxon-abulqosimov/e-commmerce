import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserAddressService } from './user-address.service';
import { CreateUserAddressDto } from './dto/create-user-address.dto';
import { UpdateUserAddressDto } from './dto/update-user-address.dto';
import { JwtAuthGuard } from 'src/guard/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('user-address')
export class UserAddressController {
  constructor(private readonly userAddressService: UserAddressService) {}

  @Post()
  create(@Body() createUserAddressDto: CreateUserAddressDto, @Req() req) {
    const userId = req.user.id; 
    return this.userAddressService.create(createUserAddressDto, +userId);
  }

  @Get()
  findAll( @Req() req) {
    const userId = req.user.id; 
    return this.userAddressService.findAll(+userId, req.user.role);
  }

  @Get(':id')
  findOne(@Param('id') id: string,  @Req() req) {
    const userId = req.user.id; 
    return this.userAddressService.findOne(+id, +userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAddressDto: UpdateUserAddressDto,  @Req() req) {
    const userId = req.user.id; 
    return this.userAddressService.update(+id, updateUserAddressDto, +userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string,  @Req() req) {
    const userId = req.user.id; 
    return this.userAddressService.remove(+id, +userId);
  }
}
