import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Quizze } from "./quizze.entity";
import { CreateQuizDto } from "./dtos/create_quizze.dto";
@Injectable()
export class QuizzesService{

    constructor(@InjectRepository(Quizze) private quizzRepository : Repository<Quizze>){}
     
    async findOne(id:string) : Promise<Quizze>{
    return this.quizzRepository.findOneBy({id});

    }
    async create(createQuizDto: CreateQuizDto): Promise<Quizze> {
        const quizz = this.quizzRepository.create(createQuizDto); // Creates a single Quizze entity
        return this.quizzRepository.save(quizz); // Saves and returns the single Quizze entity
      }

      async update(id:string,attrs :Partial<Quizze>){
        const quize=await this.findOne(id);
        if(!quize){
          throw new Error ('Quiz not found')
        }
        Object.assign(quize,attrs);
        return this.quizzRepository.save(quize);
    
      }
    
      async remove(id:string){
        const quiz = await this.findOne(id);
        if(!quiz){
          throw new Error('User not found');
        }
        return this.quizzRepository.remove(quiz);
      }
    
}