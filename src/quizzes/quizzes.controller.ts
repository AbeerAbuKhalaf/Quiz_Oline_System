import { Controller } from '@nestjs/common';
import { Param,Get,Patch,Delete } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { Quizze } from './quizze.entity';
import { CreateQuizDto } from './dtos/create_quizze.dto';
import { Body,Post } from '@nestjs/common';
import { UpdateQuizDto } from './dtos/update_quizze.dto';
@Controller('quizzes')
export class QuizzesController {
    constructor(private  quizService: QuizzesService ) {}

    @Get(':id')
    async getQuiz(@Param('id') id: string): Promise<Quizze> {
      return this.quizService.findOne(id);
    }
    @Post()
    async createQuiz(@Body() createQuizrDto: CreateQuizDto){
      this.quizService.create(createQuizrDto);
    }

    @Patch('/:id')
    updateQuiz(@Param('id') id:string, @Body() body:UpdateQuizDto){
     return this.quizService.update(id,body);
    }
  
  
    @Delete('/:id')
    removeQuiz(@Param('id') id:string){
      return this.quizService.remove(id);
    }
}
