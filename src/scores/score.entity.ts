import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Quizze } from 'src/quizzes/quizze.entity';

@Entity('scores')
export class Score {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', length: 255 })
  user_id: string;

  @ManyToOne(() => User, (user) => user.scores)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'quiz_id' })
  quiz_id: string;

  @ManyToOne(() => Quizze, (quiz) => quiz.scores)
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quizze;

  @Column({ type: 'int', name: 'score' })
  score: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @Column({ name: 'created_by' })
  createdById: string;

  @ManyToOne(() => User, (user) => user.createdScores)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;

  @Column({ name: 'updated_by' })
  updatedById: string;

  @ManyToOne(() => User, (user) => user.updatedScores)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;
}
