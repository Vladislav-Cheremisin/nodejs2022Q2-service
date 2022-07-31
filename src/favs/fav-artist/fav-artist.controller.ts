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
  async addArtistToFav(@Param('id') id: string): Promise<string> {
    return await this.favArtistService.addArtistToFav(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-type', 'application/json')
  async removeArtistFromFav(@Param('id') id: string) {
    return await this.favArtistService.removeArtistFromFav(id);
  }
}
