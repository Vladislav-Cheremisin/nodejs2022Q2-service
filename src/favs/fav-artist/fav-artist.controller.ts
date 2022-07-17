import {
  Controller,
  Delete,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavArtistService } from './fav-artist.service';

@Controller('favs/artist')
export class FavArtistController {
  constructor(private readonly favArtistService: FavArtistService) {}

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  addArtistToFav(@Param('id') id: string): string {
    return this.favArtistService.addArtistToFav(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-type', 'application/json')
  removeArtistFromFav(@Param('id') id: string) {
    return this.favArtistService.removeArtistFromFav(id);
  }
}
