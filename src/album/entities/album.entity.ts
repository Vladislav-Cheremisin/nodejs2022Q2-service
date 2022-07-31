import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity('albums')
export class AlbumEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column({ nullable: true })
  artistId: string | null;

  @ManyToOne(() => ArtistEntity, (artist) => artist.albums, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;

  @OneToMany(() => TrackEntity, (track) => track.album, { cascade: true })
  tracks: TrackEntity[];
}
