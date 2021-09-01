import bcrypt from 'bcryptjs';
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/User';

import { Status } from './types';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column({
    default: 'PENDING' as Status,
    length: 30,
  })
  status: string;

  @ManyToOne(() => User, (user) => user.tasks)
  created_by: User["id"];

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
