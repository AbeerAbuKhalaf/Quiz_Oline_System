 import { Entity,CreateDateColumn,ManyToOne,Column,UpdateDateColumn,JoinColumn,PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/user.entity";
import { Quizze } from "src/quizzes/quizze.entity";
import { Question } from "src/questions/question.entity";
import { Option } from "src/options/option.entity";
@Entity('responses')
export class Response{
    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({name:"user_id"})
    user_id:string;

    @ManyToOne(()=>User,(user)=>user.responses)
    @JoinColumn({name: "user_id"})
    user:User;

    @Column({name:"quiz_id"})
    quiz_id:string;

     @ManyToOne(()=>Quizze,(quiz)=>quiz.responses)
     @JoinColumn({name: "quiz_id"})
     quiz:Quizze;

     @Column({name:"question_id"})
     question_id:string;

     @ManyToOne(()=>Question,(question)=>question.responses)
     @JoinColumn({name: "question_id"})
     question:Question;

    @Column({name:"selected_option_id"})
    selected_option_id:string;

    @ManyToOne(()=>Option,(option)=>option.responses)
    @JoinColumn({name: "selected_option_id"})
    option:Option;



   @CreateDateColumn()
   created_at: Date;
  
   @Column({ name: 'created_by' })
   createdById: string;
  
  @ManyToOne(() => User, (user) => user.createdResponse)
  @JoinColumn({ name: 'created_by' })
  createdBy: User;
  
   @UpdateDateColumn()
   updated_at: Date;

   @Column({ name: 'updated_by' })
   updatedById: string;
  
   @ManyToOne(() => User, (user) => user.updatedResponse)
   @JoinColumn({ name: 'updated_by' })
     updatedBy: User;
}