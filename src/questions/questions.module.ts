import { Module } from '@nestjs/common';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './question.entity';
import { JwtModule } from '@nestjs/jwt';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { UsersModule } from 'src/users/users.module'; // Import UsersModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    QuizzesModule,
    UsersModule, // Import UsersModule to access AuthService
  ],
  exports: [QuestionsService],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
