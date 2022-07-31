import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('artists')
export class ArtistEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  @OneToMany(() => AlbumEntity, (album) => album.id, { cascade: true })
  albums: AlbumEntity[];

  @OneToMany(() => TrackEntity, (track) => track.artist, { cascade: true })
  tracks: TrackEntity[];
}
