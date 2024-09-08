import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';
import { Quizze } from './quizzes/quizze.entity';
import { QuizzesModule } from './quizzes/quizzes.module';
import { Question } from './questions/question.entity';
import { QuestionsModule } from './questions/questions.module';
import { OptionsModule } from './options/options.module';
import { Option } from './options/option.entity';
import { ResponsesModule } from './responses/responses.module';
import { ScoresModule } from './scores/scores.module';
import { Response } from './responses/response.entity';


@Module({
  imports: [ConfigModule.forRoot()
    ,UsersModule,QuizzesModule,QuestionsModule,OptionsModule,ResponsesModule,ScoresModule,TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User,Quizze,Question,Option,Response,],
        // synchronize: true, // Use with caution in production
        logging: true,    // Enable logging for debugging
      }),
    }), ResponsesModule, ScoresModule,
    
    //QuestionsModule,
   // OptionsModule, // Add the UsersModule here
    // other modules
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
