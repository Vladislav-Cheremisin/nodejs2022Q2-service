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

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @Header('Content-type', 'application/json')
  getTracks(): string {
    return this.trackService.getTracks();
  }

  @Get(':id')
  @Header('Content-type', 'application/json')
  getTrack(@Param('id') id: string): string {
    return this.trackService.getTrack(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Content-type', 'application/json')
  createUser(@Body() createUserDto: CreateTrackDto): string {
    return this.trackService.createTrack(createUserDto);
  }

  @Put(':id')
  @Header('Content-type', 'application/json')
  updateTrack(
    @Body() updateTrackDto: UpdateTrackDto,
    @Param('id') id: string,
  ): string {
    return this.trackService.updateTrack(updateTrackDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Header('Content-type', 'application/json')
  deleteUser(@Param('id') id: string) {
    return this.trackService.deleteTrack(id);
  }
}
