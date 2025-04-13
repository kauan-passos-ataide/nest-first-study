import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}
  async create(data: CreateUserDto): Promise<User | null> {
    try {
      const hash = await this.hashPassword(data.password);
      if (!hash) {
        return null;
      }
      const user = this.usersRepository.create({
        name: data.name,
        age: data.age,
        email: data.email,
        password: hash,
      });
      return await this.usersRepository.save(user);
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return null;
    }
  }

  findById(id: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }
  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
