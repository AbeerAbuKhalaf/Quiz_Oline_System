import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Question } from 'src/questions/question.entity';
import { Response } from 'src/responses/response.entity';
import { Score } from 'src/scores/score.entity';
import { BaseEntity } from 'src/common/base.entity';
@Entity('quizzes')
export class Quizze {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'title' })
  title: string;

  @Column({ type: 'text', name: 'description' })
  description: string;

  @CreateDateColumn()
 created_at: Date;

  @Column({ name: 'created_by' })
  createdById: string;

  @ManyToOne(() => User, (user) => user.createdQ)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ name: 'updated_by' })
  updatedById: string;

  @ManyToOne(() => User, (user) => user.updatedQ)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;

  @OneToMany(() => Question, (questions) => questions.quizze)
  questions: Question[];

  @OneToMany(() => Response, (responses) => responses.quiz)
  responses: Response[];

  @OneToMany(() => Score, (score) => score.quiz)
  scores: Score[];
}
