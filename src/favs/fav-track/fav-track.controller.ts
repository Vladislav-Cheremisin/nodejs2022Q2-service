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
  addTrackToFav(@Param('id') id: string): string {
    return this.favTrackService.addTrackToFav(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-type', 'application/json')
  removeTrackFromFav(@Param('id') id: string) {
    return this.favTrackService.removeTrackFromFav(id);
  }
}
