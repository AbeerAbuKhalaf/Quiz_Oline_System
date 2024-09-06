import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { User } from './users/user.entity';
import { QuizzesModule } from './quizzes/quizzes.module';
import { OptionsModule } from './options/options.module';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsService } from './questions/questions.service';
import { QuestionsModule } from './questions/questions.module';



@Module({
  imports: [ConfigModule.forRoot()
    ,UsersModule,TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User],
        // synchronize: true, // Use with caution in production
        logging: true,    // Enable logging for debugging
      }),
    }),
    UsersModule,
    //QuizzesModule,
    //QuestionsModule,
   // OptionsModule, // Add the UsersModule here
    // other modules
  ],
  controllers: [AppController,],
  providers: [AppService],
})
export class AppModule {}
