import { Exclude, Transform } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  @Exclude()
  password: string;

  @Column({
    nullable: true,
  })
  @Exclude()
  refreshTokenHash: string;

  @VersionColumn({
    default: 1,
  })
  version: number;

  @CreateDateColumn()
  @Transform(({ value }) => +new Date(value))
  createdAt: number;

  @UpdateDateColumn()
  @Transform(({ value }) => +new Date(value))
  updatedAt: number;
}
