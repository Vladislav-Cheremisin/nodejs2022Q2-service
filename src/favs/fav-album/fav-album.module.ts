import { Module } from '@nestjs/common';
import { FavAlbumService } from './fav-album.service';
import { FavAlbumController } from './fav-album.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavAlbumEntity } from './entities/fav-album.entity';
import { AlbumEntity } from 'src/album/entities/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FavAlbumEntity, AlbumEntity])],
  providers: [FavAlbumService],
  controllers: [FavAlbumController],
})
export class FavAlbumModule {}
