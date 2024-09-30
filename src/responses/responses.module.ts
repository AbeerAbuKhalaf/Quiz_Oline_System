import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ResponsesController } from './responses.controller';
import { ResponsesService } from './responses.service';
import { Response } from './response.entity';
import { QuestionsModule } from 'src/questions/questions.module';
import { UsersModule } from 'src/users/users.module';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { OptionsModule } from 'src/options/options.module'; // Ensure correct import
import { QuizzesService } from 'src/quizzes/quizzes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Response]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    QuestionsModule,
    QuizzesModule,
    UsersModule,
    OptionsModule, // Ensure OptionsModule is imported here
  ],
  // Ensure ResponsesService is exported here
  controllers: [ResponsesController],
  providers: [ResponsesService, QuizzesService],
})
export class ResponsesModule {}
