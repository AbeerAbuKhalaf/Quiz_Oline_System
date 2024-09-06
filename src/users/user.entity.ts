// src/user/user.entity.ts
import { Quizze } from 'src/quizzes/quizze.entity';
import { Entity, Column, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({name: "username", unique: true,type:"varchar" })
  username: string;

  @Column({ name: "email",unique: true,type:"varchar" })
  email: string;

  @Column({name:"password",type:"varchar"})
  password: string;

  @Column({name:"role", type: 'enum', enum: ['student', 'admin'] })
  role: 'student' | 'admin';

  @CreateDateColumn({name:"created_at",type: "timestamp"})
  created_at: Date;

  @ManyToOne(()=>User)
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @UpdateDateColumn({name:"updated_at",type: "timestamp"})
  updated_at: Date;

  @ManyToOne(()=>User)
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;

 
  /*@OneToMany(()=>Quizze,quizze=>quizze.user)
  quizzes:Quizze[];*/

}
