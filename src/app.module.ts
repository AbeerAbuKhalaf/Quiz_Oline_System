import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
import { Score } from './scores/score.entity';
import { JwtModule } from '@nestjs/jwt';
import * as path from 'path';
import {
  I18nModule,
  AcceptLanguageResolver,
  QueryResolver,
  HeaderResolver,
} from 'nestjs-i18n';
import { seconds, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    CacheModule.register({
      max: 100,
      ttl: seconds(60),
      isGlobal: true,
      store: redisStore,
      host: 'localhost',
      port: 6379,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: seconds(30),
        limit: 2,
      },
    ]),
    ConfigModule.forRoot(),
    UsersModule,
    QuizzesModule,
    QuestionsModule,
    OptionsModule,
    ResponsesModule,
    ScoresModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [User, Quizze, Question, Option, Response, Score],
        logging: true,
      }),
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
