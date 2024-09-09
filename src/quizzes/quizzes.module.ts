import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quizze } from './quizze.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quizze])],
  controllers: [QuizzesController],
  providers: [QuizzesService],
})
export class QuizzesModule {}
