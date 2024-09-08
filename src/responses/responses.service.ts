import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from './response.entity';
import { CreateResponseDto } from './dtos/create-response.dto';
@Injectable()
export class ResponsesService {
    constructor(@InjectRepository(Response) private responseRepositry:Repository<Response>){}
    
    async findOne(id:string):Promise<Response>{
        return this.responseRepositry.findOneBy({id});
    }
    async create(createResponseDto: CreateResponseDto): Promise<Response> {
        const response = this.responseRepositry.create(createResponseDto); // Creates a single Quizze entity
        return this.responseRepositry.save(response); // Saves and returns the single Quizze entity
      }
    
      async update(id:string,attrs :Partial<Response>){
        const response=await this.findOne(id);
        if(!response){
          throw new Error ('Response NoT found')
        }
        Object.assign(response,attrs);
        return this.responseRepositry.save(response);
    
      }
    
      async remove(id:string){
        const response = await this.findOne(id);
        if(!response){
          throw new Error('Response Not Found');
        }
        return this.responseRepositry.remove(response);
      }
}