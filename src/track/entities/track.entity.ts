import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => AlbumEntity, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  album: AlbumEntity;

  @ManyToOne(() => ArtistEntity, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  artist: ArtistEntity;
}
