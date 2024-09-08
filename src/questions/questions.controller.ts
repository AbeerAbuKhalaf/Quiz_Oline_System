import { Controller } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Get,Param,Post,Body,Delete,Patch } from '@nestjs/common';
import { Question } from './question.entity';
import { CreateQuestionDto } from './dtos/create-question.dto';
import { UpdateQuestinDto } from './dtos/update-question.dto';

@Controller('questions')
export class QuestionsController {
    constructor(private questionService:QuestionsService){}

    @Get(':id')
  async getQuestion(@Param('id') id: string): Promise<Question> {
    return this.questionService.findOne(id);
  }
  @Post()
  async createQuestion(@Body() createQuizrDto: CreateQuestionDto){
    this.questionService.create(createQuizrDto);
  }

  @Patch('/:id')
  updateQuestion(@Param('id') id:string, @Body() body:UpdateQuestinDto){
   return this.questionService.update(id,body);
  }

  


  @Delete('/:id')
  removeQuestion(@Param('id') id:string){
    return this.questionService.remove(id);
  }
}




