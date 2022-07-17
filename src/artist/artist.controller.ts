import { ArtistService } from './artist.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @Header('Content-type', 'application/json')
  getArtists(): string {
    return this.artistService.getArtists();
  }

  @Get(':id')
  @Header('Content-type', 'application/json')
  getArtist(@Param('id') id: string): string {
    return this.artistService.getArtist(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createArtist(@Body() createArtistDto: CreateArtistDto): string {
    return this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  @Header('Content-type', 'application/json')
  updateArtist(
    @Body() updateArtistDto: UpdateArtistDto,
    @Param('id') id: string,
  ): string {
    return this.artistService.updateArtist(updateArtistDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-type', 'application/json')
  deleteArtist(@Param('id') id: string) {
    return this.artistService.deleteArtist(id);
  }
}
