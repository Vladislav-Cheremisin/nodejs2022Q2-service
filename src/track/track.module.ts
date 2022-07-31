import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { FavTrackEntity } from 'src/favs/fav-track/entities/fav-track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TrackEntity,
      ArtistEntity,
      AlbumEntity,
      FavTrackEntity,
    ]),
  ],
  providers: [TrackService],
  controllers: [TrackController],
})
export class TrackModule {}
