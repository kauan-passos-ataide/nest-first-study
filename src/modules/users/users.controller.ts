import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/createUserDto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<User | null> {
    const user = this.usersService.findById(id);
    if (user === null) {
      throw new NotFoundException(`User not found.`);
    }
    return user;
  }

  @Post()
  create(@Body() data: CreateUserDto) {
    const user = this.usersService.create(data);
    if (user === null) {
      throw new Error('Failed to create user');
    }
    return user;
  }
}
