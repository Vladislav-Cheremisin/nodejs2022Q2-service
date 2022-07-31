import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';
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
import { TrackEntity } from './entities/track.entity';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @Header('Content-type', 'application/json')
  async getTracks(): Promise<TrackEntity[]> {
    return await this.trackService.getTracks();
  }

  @Get(':id')
  @Header('Content-type', 'application/json')
  async getTrack(@Param('id') id: string): Promise<TrackEntity> {
    return await this.trackService.getTrack(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  async createTrack(
    @Body() createArtistDto: CreateTrackDto,
  ): Promise<TrackEntity> {
    return await this.trackService.createTrack(createArtistDto);
  }

  @Put(':id')
  @Header('Content-type', 'application/json')
  async updateTrack(
    @Body() updateTrackDto: UpdateTrackDto,
    @Param('id') id: string,
  ): Promise<TrackEntity> {
    return await this.trackService.updateTrack(updateTrackDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-type', 'application/json')
  async deleteTrack(@Param('id') id: string) {
    return await this.trackService.deleteTrack(id);
  }
}
