import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
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
import { ArtistEntity } from './entities/artist.entity';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @Header('Content-type', 'application/json')
  async getArtists(): Promise<ArtistEntity[]> {
    return await this.artistService.getArtists();
  }

  @Get(':id')
  @Header('Content-type', 'application/json')
  async getArtist(@Param('id') id: string): Promise<ArtistEntity> {
    return await this.artistService.getArtist(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  async createArtist(
    @Body() createArtistDto: CreateArtistDto,
  ): Promise<ArtistEntity> {
    return await this.artistService.createArtist(createArtistDto);
  }

  @Put(':id')
  @Header('Content-type', 'application/json')
  async updateArtist(
    @Body() updateArtistDto: UpdateArtistDto,
    @Param('id') id: string,
  ): Promise<ArtistEntity> {
    return await this.artistService.updateArtist(updateArtistDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-type', 'application/json')
  async deleteArtist(@Param('id') id: string) {
    return await this.artistService.deleteArtist(id);
  }
}
