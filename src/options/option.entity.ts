import { Column, Entity, PrimaryGeneratedColumn,UpdateDateColumn,CreateDateColumn } from "typeorm";

@Entity('options')
export class Option{

      @PrimaryGeneratedColumn("uuid")
      id:string;

      @Column()
      question_id: string;

      @Column()
      option_text: string;

      @Column()
      is_correct: boolean;
      @Column()
    created_at:Date;

    @CreateDateColumn()
    created_by:string;

    @Column()
    updated_at:Date;

    @UpdateDateColumn()
    updated_by:string;




}