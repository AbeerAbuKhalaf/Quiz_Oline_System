import { Column, Entity, PrimaryGeneratedColumn,CreateDateColumn,UpdateDateColumn } from "typeorm";


@Entity('questions')
export class Question{
   
    @PrimaryGeneratedColumn("uuid")
    id:string;

    @Column({type: "uuid"})
    quiz_id:string;

    @Column({type:"enum" ,enum :["multiple_choice","true_false"]})
    question_type : "multiple_choice" | "true_false";

    @CreateDateColumn()
    created_at: Date;
  
    @Column({ nullable: true })
    created_by: string;
  
    @UpdateDateColumn()
    updated_at: Date;
  
    @Column({ nullable: true })
    updated_by: string;
}
  
