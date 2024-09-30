import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { Quizze } from 'src/quizzes/quizze.entity';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question) private questionRepositry: Repository<Question>,
    private i18n: I18nService,
  ) {}

  async findOne(id: string): Promise<Question> {
    return this.questionRepositry.findOneBy({ id });
  }
  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = this.questionRepositry.create(createQuestionDto); // Create a new Question entity
    return this.questionRepositry.save(question); // Save and return the new Question entity
  }

  async update(id: string, attrs: Partial<Question>) {
    const question = await this.findOne(id);
    if (!question) {
      throw new Error('Question NoT found');
    }
    Object.assign(question, attrs);
    return this.questionRepositry.save(question);
  }

  async remove(id: string) {
    const question = await this.findOne(id);
    if (!question) {
     throw new NotFoundException(
       await this.i18n.translate('test.QUESTION_NOT_FOUND'),
     );
    }
    return this.questionRepositry.remove(question);
  }
}
