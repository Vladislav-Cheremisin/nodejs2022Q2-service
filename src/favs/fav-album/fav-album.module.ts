import { Module } from '@nestjs/common';
import { FavAlbumService } from './fav-album.service';
import { FavAlbumController } from './fav-album.controller';

@Module({
  providers: [FavAlbumService],
  controllers: [FavAlbumController],
})
export class FavAlbumModule {}
