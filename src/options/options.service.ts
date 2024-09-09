import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Option } from './option.entity';
import { CreateOptionDto } from './dtos/create-option.dto';
@Injectable()
export class OptionsService {
  constructor(
    @InjectRepository(Option) private optionRepositry: Repository<Option>,
  ) {}

  async findOne(id: string): Promise<Option> {
    return this.optionRepositry.findOneBy({ id });
  }
  async create(createOptionDto: CreateOptionDto): Promise<Option> {
    const option = this.optionRepositry.create(createOptionDto); // Creates a single Quizze entity
    return this.optionRepositry.save(option); // Saves and returns the single Quizze entity
  }

  async update(id: string, attrs: Partial<Option>) {
    const option = await this.findOne(id);
    if (!option) {
      throw new Error('Option NoT found');
    }
    Object.assign(option, attrs);
    return this.optionRepositry.save(option);
  }

  async remove(id: string) {
    const option = await this.findOne(id);
    if (!option) {
      throw new Error('Option Not Found');
    }
    return this.optionRepositry.remove(option);
  }
}
