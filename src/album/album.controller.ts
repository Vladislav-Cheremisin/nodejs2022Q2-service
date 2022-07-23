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

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @Header('Content-type', 'application/json')
  getAlbums(): string {
    return this.albumService.getAlbums();
  }

  @Get(':id')
  @Header('Content-type', 'application/json')
  getAlbum(@Param('id') id: string): string {
    return this.albumService.getAlbum(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createAlbum(@Body() createAlbumDto: CreateAlbumDto): string {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @Header('Content-type', 'application/json')
  updateAlbum(
    @Body() updateAlbumDto: UpdateAlbumDto,
    @Param('id') id: string,
  ): string {
    return this.albumService.updateAlbum(updateAlbumDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-type', 'application/json')
  deleteAlbum(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
