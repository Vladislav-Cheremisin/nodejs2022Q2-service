import { FavAlbumService } from './fav-album.service';
import {
  Controller,
  Delete,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

@Controller('favs/album')
export class FavAlbumController {
  constructor(private readonly favAlbumService: FavAlbumService) {}

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  addAlbumToFav(@Param('id') id: string): string {
    return this.favAlbumService.addAlbumToFav(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-type', 'application/json')
  removeAlbumFromFav(@Param('id') id: string) {
    return this.favAlbumService.removeAlbumFromFav(id);
  }
}
