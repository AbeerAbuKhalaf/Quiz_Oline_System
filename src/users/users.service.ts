// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create_user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id:string,attrs :Partial<User>){
    const user=await this.findOne(id);
    if(!user){
      throw new Error ('User not found')
    }
    Object.assign(user,attrs);
    return this.userRepository.save(user);

  }

  async remove(id:string){
    const user = await this.findOne(id);
    if(!user){
      throw new Error('User not found');
    }
    return this.userRepository.remove(user);
  }
}
