import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dtos/create-question.dto';

@Injectable()
export class QuestionsService {
    constructor(@InjectRepository(Question) private questionRepositry:Repository<Question>){}
    
    async findOne(id:string):Promise<Question>{
        return this.questionRepositry.findOneBy({id});
    }
    async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
        const question = this.questionRepositry.create(createQuestionDto); // Creates a single Quizze entity
        return this.questionRepositry.save(question); // Saves and returns the single Quizze entity
      }
    
      async update(id:string,attrs :Partial<Question >){
        const question=await this.findOne(id);
        if(!question){
          throw new Error ('Question NoT found')
        }
        Object.assign(question,attrs);
        return this.questionRepositry.save(question);
    
      }
    
      async remove(id:string){
        const question = await this.findOne(id);
        if(!question){
          throw new Error('Question Not Found');
        }
        return this.questionRepositry.remove(question);
      }
}
