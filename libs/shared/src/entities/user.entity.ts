import { Max, Min } from '@nestjs/class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../enums';

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

  @Column({ default: false })
  active: boolean;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.worker,
  })
  role: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isMaster: boolean;
}
