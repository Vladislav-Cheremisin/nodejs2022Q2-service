import { Module } from '@nestjs/common';
import { FavArtistService } from './fav-artist.service';
import { FavArtistController } from './fav-artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavArtistEntity } from './entities/fav-artist.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavArtistEntity, ArtistEntity])],
  providers: [FavArtistService],
  controllers: [FavArtistController],
})
export class FavArtistModule {}
