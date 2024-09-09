// src/user/user.entity.ts
import { Question } from 'src/questions/question.entity';
import { Quizze } from 'src/quizzes/quizze.entity';
import {
  Entity,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Response } from 'src/responses/response.entity';
import { Option } from 'src/options/option.entity';
import { Score } from 'src/scores/score.entity';
import { BaseEntity } from 'src/common/base.entity';

@Entity('users')
export class User extends BaseEntity {
  //@PrimaryGeneratedColumn('uuid')
 // id: string;

  @Column({ name: 'username', unique: true, type: 'varchar' })
  username: string;

  @Column({ name: 'email', unique: true, type: 'varchar' })
  email: string;

  @Column({ name: 'password', type: 'varchar' })
  password: string;

  @Column({ name: 'role', type: 'enum', enum: ['student', 'admin'] })
  role: 'student' | 'admin';

  /*@CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;*/

  @OneToMany(() => Quizze, (quiz) => quiz.createdBy)
  createdQ: Quizze[];

  @OneToMany(() => Quizze, (quiz) => quiz.updatedBy)
  updatedQ: Quizze[];

  @OneToMany(() => Question, (question) => question.createdBy)
  createdQuestions: Question[];

  @OneToMany(() => Question, (question) => question.updatedBy)
  updatedQuestions: Question[];

  @OneToMany(() => Option, (option) => option.createdBy)
  createdOption: Option[];

  @OneToMany(() => Option, (option) => option.updatedBy)
  updatedOption: Option[];

  @OneToMany(() => Response, (response) => response.createdBy)
  createdResponse: Option[];

  @OneToMany(() => Response, (response) => response.updatedBy)
  updatedResponse: Option[];

  @OneToMany(() => Score, (score) => score.createdBy)
  createdScores: Score[];

  @OneToMany(() => Score, (score) => score.updatedBy)
  updatedScores: Score[];

  @OneToMany(() => Response, (responses) => responses.user)
  responses: Response[];

  @OneToMany(() => Score, (score) => score.user)
  scores: Score[];
}
