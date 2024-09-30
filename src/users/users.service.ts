// src/user/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create_user.dto';
import { I18nService } from 'nestjs-i18n';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly i18n: I18nService,
  ) {}

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('User not found'); // Ensure an exception is thrown when user is not found
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }
  //The Partial<User> type means that only some of the properties of the User entity may be passed (not all fields are required).

  async update(id: string, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    //Object.assign is a JavaScript method that copies all properties from the attrs object (which contains the updated fields) to the existing user object.
    Object.assign(user, attrs);

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new Error('User not found');
    }
    return this.userRepository.remove(user);
  }
  
}
