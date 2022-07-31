import { FavTrackService } from './fav-track.service';
import {
  Controller,
  Delete,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

@Controller('favs/track')
export class FavTrackController {
  constructor(private readonly favTrackService: FavTrackService) {}

  @Post(':id')
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  async addTrackToFav(@Param('id') id: string): Promise<string> {
    return await this.favTrackService.addTrackToFav(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-type', 'application/json')
  async removeTrackFromFav(@Param('id') id: string) {
    return await this.favTrackService.removeTrackFromFav(id);
  }
}
