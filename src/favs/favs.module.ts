import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { FavTrackModule } from './fav-track/fav-track.module';
import { FavAlbumModule } from './fav-album/fav-album.module';
import { FavArtistModule } from './fav-artist/fav-artist.module';

@Module({
  providers: [FavsService],
  controllers: [FavsController],
  imports: [FavTrackModule, FavAlbumModule, FavArtistModule],
})
export class FavsModule {}
