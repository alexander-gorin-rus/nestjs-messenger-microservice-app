import { Max, Min } from '@nestjs/class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  @Min(3)
  @Max(20)
  login: string;

  @Column({ select: false })
  @Min(3)
  @Max(20)
  password: string;

  // @Column()
  // role: string;
}
