import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { FavAlbumEntity } from 'src/favs/fav-album/entities/fav-album.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlbumEntity, ArtistEntity, FavAlbumEntity]),
  ],
  providers: [AlbumService],
  controllers: [AlbumController],
})
export class AlbumModule {}
