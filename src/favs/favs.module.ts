import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { FavTrackModule } from './fav-track/fav-track.module';
import { FavAlbumModule } from './fav-album/fav-album.module';
import { FavArtistModule } from './fav-artist/fav-artist.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavAlbumEntity } from './fav-album/entities/fav-album.entity';
import { FavArtistEntity } from './fav-artist/entities/fav-artist.entity';
import { FavTrackEntity } from './fav-track/entities/fav-track.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { TrackEntity } from 'src/track/entities/track.entity';

@Module({
  providers: [FavsService],
  controllers: [FavsController],
  imports: [
    FavTrackModule,
    FavAlbumModule,
    FavArtistModule,
    TypeOrmModule.forFeature([
      FavAlbumEntity,
      FavArtistEntity,
      FavTrackEntity,
      ArtistEntity,
      AlbumEntity,
      TrackEntity,
    ]),
  ],
})
export class FavsModule {}
