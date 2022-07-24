import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fav-artists')
export class FavArtistEntity {
  @PrimaryGeneratedColumn()
  id: string;
}
