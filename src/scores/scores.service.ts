import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Score } from './score.entity';
import { CreateScoreDto } from './dtos/create-score.dto';
import { UpdateScoreDto } from './dtos/update-score.dto';
@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(Score) private scoreRepository: Repository<Score>,
  ) {}

  async findOne(id: string): Promise<Score> {
    return this.scoreRepository.findOneBy({ id });
  }
  async create(createScoreDto: CreateScoreDto): Promise<Score> {
    const score = this.scoreRepository.create(createScoreDto); // Creates a single Quizze entity
    return this.scoreRepository.save(score); // Saves and returns the single Quizze entity
  }

  async update(id: string, attrs: Partial<Score>) {
    const score = await this.findOne(id);
    if (!score) {
      throw new Error('Score not found');
    }
    Object.assign(score, attrs);
    return this.scoreRepository.save(score);
  }

  async remove(id: string) {
    const score = await this.findOne(id);
    if (!score) {
      throw new Error('Score not found');
    }
    return this.scoreRepository.remove(score);
  }
}
