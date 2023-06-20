import { Max, Min } from '@nestjs/class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Min(3)
  @Max(20)
  login: string;

  @Column()
  @Min(3)
  @Max(20)
  password: string;

  // @Column()
  // role: string;
}
