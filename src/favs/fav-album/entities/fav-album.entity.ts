import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fav-albums')
export class FavAlbumEntity {
  @PrimaryGeneratedColumn()
  id: string;
}
