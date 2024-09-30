import { join } from 'path';
import { Quizze } from 'src/quizzes/quizze.entity';
import {
  OneToMany,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Option } from 'src/options/option.entity';
import { User } from 'src/users/user.entity';
import { Response } from 'src/responses/response.entity';
@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'quiz_id' })
  quiz_id: string;

  @ManyToOne(() => Quizze, (quizze) => quizze.questions)
  @JoinColumn({ name: 'quiz_id' })
  quizze: Quizze;

  @Column({ name: 'question_text', nullable: false,type:'text' })
  question_text: string;
 
  @Column({name:'question_type',
    type: 'enum',
    enum: ['multiple_choice', 'true_false'],
    nullable: false,
  })
  question_type: 'multiple_choice' | 'true_false';

  @CreateDateColumn()
  created_at: Date;

  @Column({ name: 'created_by' })
  createdById: string;

  @ManyToOne(() => User, (user) => user.createdQuestions)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ name: 'updated_by' })
  updatedById: string;

  @ManyToOne(() => User, (user) => user.updatedQuestions)
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;

  @OneToMany(() => Option, (options) => options.question)
  options: Option[];

  @OneToMany(() => Response, (responses) => responses.question)
  responses: Response[];
}
