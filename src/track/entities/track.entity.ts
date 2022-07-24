import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tracks')
export class TrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  artistId: string;

  @Column({ nullable: true })
  albumId: string;

  @Column()
  duration: number;
}
