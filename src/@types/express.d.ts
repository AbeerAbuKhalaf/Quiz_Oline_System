import { Question } from 'src/questions/question.entity';
import { User } from '../users/user.entity'; // Adjust the path to your User entity
import { Quizze } from 'src/quizzes/quizze.entity';
declare global {
  namespace Express {
    interface Request {
      user?: User; // Add user property to Request
      quiz?: Quizze;
      question?:Question
      option?: Option
    }
  }
}
