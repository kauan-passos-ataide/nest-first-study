import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SignInDto } from './dto/signIn.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { UsersService } from '../users/users.service';
import { SignUpDto } from '../users/dto/signUp.dto';
import { Public } from '../../common/decorators/publicRoute.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Public()
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    const token = await this.authService.signIn(signInDto);
    if (token === null) {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }
    return {
      accessToken: token,
    };
  }

  @Public()
  @Post('signup')
  async create(@Body() data: CreateUserDto): Promise<SignUpDto> {
    const foundUser = await this.usersService.findByEmail(data.email);
    if (foundUser !== null) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const user = await this.usersService.create(data);
    if (user === null) {
      throw new HttpException(
        'Error to create a new user',
        HttpStatus.BAD_REQUEST
      );
    }
    return user;
  }
}
