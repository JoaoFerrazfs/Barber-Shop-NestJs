import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from '../dto/userCreate.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async create({
    email,
    password,
    phone,
    type,
    name,
  }: UserCreateDto): Promise<User> {
    const user = this.userRepository.create({
      name,
      email,
      password,
      phone,
      type,
    });

    return await this.userRepository.save(user);
  }

  public async getUserByCredentials(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
