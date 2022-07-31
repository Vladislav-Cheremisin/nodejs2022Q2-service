import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
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
import { AlbumEntity } from './entities/album.entity';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @Header('Content-type', 'application/json')
  async getAlbums(): Promise<AlbumEntity[]> {
    return await this.albumService.getAlbums();
  }

  @Get(':id')
  @Header('Content-type', 'application/json')
  async getAlbum(@Param('id') id: string): Promise<AlbumEntity> {
    return await this.albumService.getAlbum(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  async createAlbum(
    @Body() createAlbumDto: CreateAlbumDto,
  ): Promise<AlbumEntity> {
    return await this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @Header('Content-type', 'application/json')
  async updateAlbum(
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Param('id') id: string,
  ): Promise<AlbumEntity> {
    return await this.albumService.updateAlbum(updateAlbumDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-type', 'application/json')
  async deleteAlbum(@Param('id') id: string) {
    return await this.albumService.deleteAlbum(id);
  }
}
