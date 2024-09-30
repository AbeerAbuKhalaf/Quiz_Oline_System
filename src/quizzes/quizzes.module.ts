import { Module } from '@nestjs/common';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quizze } from './quizze.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module'; // Import UsersModule for AuthService access

@Module({
  imports: [
    TypeOrmModule.forFeature([Quizze]),
    JwtModule.register({
      secret: 'secret', // Your JWT secret key
      signOptions: { expiresIn: '1d' }, // Token expiration time
    }),
    UsersModule, // Import UsersModule here
  ],
  exports: [QuizzesService, TypeOrmModule],
  controllers: [QuizzesController],
  providers: [QuizzesService], // QuizzesService only
})
export class QuizzesModule {}
