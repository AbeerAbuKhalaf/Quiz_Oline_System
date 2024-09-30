import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret', // Your JWT secret key
      signOptions: { expiresIn: '1d' }, // Token expiration time
    }),
  ],
  providers: [
    UsersService,
    AuthService,
    
  ], // AuthService is registered here
  controllers: [UsersController],
  exports: [AuthService],
  // AuthService exported so other modules can use it
})
export class UsersModule {}
