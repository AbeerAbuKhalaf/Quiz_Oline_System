import { Entity,PrimaryGeneratedColumn,Column,UpdateDateColumn,CreateDateColumn,ManyToOne,JoinColumn } from "typeorm";
import { User } from "src/users/user.entity";
Entity('quizzes')
export class Quizze{

    @PrimaryGeneratedColumn("uuid")
    id :string;

    @Column({type: "varchar",length: 255,nullable: false,name:"title"})
    title:string;

    @Column({type:'text',name:"description"})
    description : string;

    @CreateDateColumn({name:"created_at",type: "timestamp"})
     created_at: Date;

     @ManyToOne(() => User, { nullable: true })
     @ManyToOne(()=>User)
     @JoinColumn({ name: 'created_by' })
     created_by: User;

     @UpdateDateColumn({name:"updated_at",type: "timestamp"})
     updated_at: Date;


     @ManyToOne(() => User, { nullable: true })
     @ManyToOne(()=>User)
     @JoinColumn({ name: 'updated_by' })
     updated_by: User;


}