import { Module } from '@nestjs/common';
import { ScoresController } from './scores.controller';
import { ScoresService } from './scores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './score.entity';
import { JwtModule } from '@nestjs/jwt';
import { QuizzesModule } from 'src/quizzes/quizzes.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Score]),
    TypeOrmModule.forFeature([Response]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
    QuizzesModule,
    UsersModule,
  ],
  controllers: [ScoresController],
  providers: [ScoresService],
})
export class ScoresModule {}
