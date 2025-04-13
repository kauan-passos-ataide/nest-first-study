import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Delete()
  async deleteUser(@Body() email: string): Promise<boolean> {
    const userDeleted = await this.usersService.deleteUser(email);
    if (!userDeleted) {
      throw new HttpException(
        'Fail to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return true;
  }
}
