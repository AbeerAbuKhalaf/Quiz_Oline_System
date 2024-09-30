import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { OptionsController } from './options.controller';
import { OptionsService } from './options.service';
import { Option } from './option.entity';
import { QuestionsModule } from '../questions/questions.module'; // Correct import
import { QuizzesModule } from '../quizzes/quizzes.module'; // Import QuizzesModule
import { UsersModule } from '../users/users.module'; // Import UsersModule for UsersService
import { QuizzesService } from 'src/quizzes/quizzes.service';
import { AuthService } from 'src/users/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Option]), // Register Option entity
    JwtModule.register({
      secret: 'secret', // JWT secret
      signOptions: { expiresIn: '1d' }, // Token expiration
    }),
    QuestionsModule, // Import QuestionsModule
    QuizzesModule, // Import QuizzesModule to access QuizzeRepository and QuizzesService
    UsersModule, // Import UsersModule to make UsersService available for AuthService
  ],
  controllers: [OptionsController], // Register OptionsController
  providers: [
    OptionsService, // Register OptionsService
    QuizzesService, // Register QuizService
    // Register AuthService for JWT and authentication logic
  ],
  exports: [
    OptionsService, // Export OptionsService
  ],
})
export class OptionsModule {}
