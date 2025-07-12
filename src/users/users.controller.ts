import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/guard/auth.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update( @Body() updateUserDto: UpdateUserDto, @Req() req) {
    const id = req.user.id
    return this.usersService.update(+id, updateUserDto);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req) {
    const id = req.user.id
    return this.usersService.remove(+id);
  }
}
