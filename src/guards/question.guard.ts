import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { QuestionsService } from 'src/questions/questions.service'; // Ensure the path is correct

@Injectable()
export class CurrentQuestionGuard implements CanActivate {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly jwtService: JwtService, // Inject the JwtService to decode the token
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new Error('Authorization header missing');
    }

    // Extract token from Bearer authorization
    const token = authHeader.split(' ')[1];

    // Decode the JWT token
    const decodedToken = this.jwtService.decode(token) as any;

    if (decodedToken && decodedToken.question_id) {
      // Find the question using the question_id from the token
      const question = await this.questionsService.findOne(
        decodedToken.question_id,
      );
      request.question = question; // Attach the question to the request object
    } else {
      throw new Error('Question ID is missing from the token');
    }

    return true; // Allow request to proceed
  }
}
