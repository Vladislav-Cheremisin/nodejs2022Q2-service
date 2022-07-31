import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fav-tracks')
export class FavTrackEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
