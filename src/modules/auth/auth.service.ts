import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signIn.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(signInDto: SignInDto): Promise<string | null> {
    const user = await this.usersService.findByEmail(signInDto.email);
    if (!user) {
      return null;
    }
    const verifyHash = await this.compareHash(
      signInDto.password,
      user.password
    );
    if (verifyHash === false) {
      return null;
    }
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return accessToken;
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
