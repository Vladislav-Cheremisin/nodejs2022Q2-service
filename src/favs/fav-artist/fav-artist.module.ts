import { Module } from '@nestjs/common';
import { FavArtistService } from './fav-artist.service';
import { FavArtistController } from './fav-artist.controller';

@Module({
  providers: [FavArtistService],
  controllers: [FavArtistController]
})
export class FavArtistModule {}
