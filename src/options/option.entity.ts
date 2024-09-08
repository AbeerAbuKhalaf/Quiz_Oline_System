import { Column, Entity, PrimaryGeneratedColumn,UpdateDateColumn,CreateDateColumn,OneToMany,JoinColumn,ManyToOne } from "typeorm";
import { User } from "src/users/user.entity";
import { Question } from "src/questions/question.entity";
import { Response } from "src/responses/response.entity";
@Entity('options')
export class Option{

      @PrimaryGeneratedColumn("uuid")
      id:string;

      @Column({name:"question_id"})
      question_id:string;
  
      @ManyToOne(()=>Question,(question)=>question.options)
      @JoinColumn({name: "question_id"})
      question:Question;

      @Column({type:"varchar",name:"option_text"})
      option_text: string;

      @Column({type:"boolean",name:"is_correct"})
      is_correct: boolean;

      @CreateDateColumn()
      created_at: Date;
    
      @Column({ name: 'created_by' })
      createdById: string;
    
      @ManyToOne(() => User, (user) => user.createdOption)
      @JoinColumn({ name: 'created_by' })
      createdBy: User;
    
      @UpdateDateColumn()
      updated_at: Date;
  
      @Column({ name: 'updated_by' })
      updatedById: string;
    
      @ManyToOne(() => User, (user) => user.updatedOption)
      @JoinColumn({ name: 'updated_by' })
      updatedBy: User;

      @OneToMany(()=>Response,(responses)=>responses.option)
       responses:Response[];
  
       
}