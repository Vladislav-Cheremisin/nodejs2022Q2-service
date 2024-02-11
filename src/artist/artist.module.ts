import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { FavArtistEntity } from 'src/favs/fav-artist/entities/fav-artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity, FavArtistEntity])],
  providers: [ArtistService],
  controllers: [ArtistController],
})
export class ArtistModule {}
