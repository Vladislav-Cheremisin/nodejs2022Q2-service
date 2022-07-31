import { Track } from 'src/interfaces';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { TrackEntity } from './entities/track.entity';
import { Repository } from 'typeorm';
import { AlbumEntity } from 'src/album/entities/album.entity';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { FavTrackEntity } from 'src/favs/fav-track/entities/fav-track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(TrackEntity)
    private trackRepo: Repository<TrackEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepo: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepo: Repository<AlbumEntity>,
    @InjectRepository(FavTrackEntity)
    private favTracksRepo: Repository<FavTrackEntity>,
  ) {}

  async getTracks(): Promise<TrackEntity[]> {
    return await this.trackRepo.find();
  }

  async getTrack(id: string): Promise<TrackEntity> {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect track ID', HttpStatus.BAD_REQUEST);
    }

    let result: null | TrackEntity = null;

    result = await this.trackRepo.findOneBy({ id: id });

    if (result === null) {
      throw new HttpException(
        'Track with entered id not found',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return result;
    }
  }

  async createTrack(CreateTrackDto: CreateTrackDto): Promise<TrackEntity> {
    if (
      typeof CreateTrackDto.name === 'string' &&
      typeof CreateTrackDto.duration === 'number'
    ) {
      const track: Track = {
        id: uuid.v4(),
        name: CreateTrackDto.name,
        artistId: null,
        albumId: null,
        duration: CreateTrackDto.duration,
      };

      if (typeof CreateTrackDto.albumId === 'string') {
        let album = null;

        album = await this.albumRepo.findOneBy({
          id: CreateTrackDto.albumId,
        });

        if (album) {
          track.albumId = CreateTrackDto.albumId;
        }
      }

      if (typeof CreateTrackDto.artistId === 'string') {
        let artist = null;

        artist = await this.artistRepo.findOneBy({
          id: CreateTrackDto.artistId,
        });

        if (artist) {
          track.artistId = CreateTrackDto.artistId;
        }
      }

      return await this.trackRepo.save(track);
    } else {
      throw new HttpException(
        'incorrect request body, fields name and duration are required',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateTrack(
    updateTrackDto: UpdateTrackDto,
    id: string,
  ): Promise<TrackEntity> {
    await this.getTrack(id);

    const updateData: Partial<TrackEntity> = {};

    if (updateTrackDto.name) {
      if (typeof updateTrackDto.name === 'string') {
        updateData.name = updateTrackDto.name;
      } else {
        throw new HttpException(
          'Incorrect name in request body',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (updateTrackDto.duration) {
      if (typeof updateTrackDto.duration === 'number') {
        updateData.duration = updateTrackDto.duration;
      } else {
        throw new HttpException(
          'Incorrect duration in request body',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (updateTrackDto.artistId) {
      let artist: null | ArtistEntity = null;

      artist = await this.artistRepo.findOneBy({ id: updateTrackDto.artistId });

      if (artist || updateTrackDto.artistId === null) {
        updateData.artistId = updateTrackDto.artistId;
      } else {
        throw new HttpException(
          'Incorrect artist ID in request body',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (updateTrackDto.albumId) {
      let album: null | AlbumEntity = null;

      album = await this.albumRepo.findOneBy({ id: updateTrackDto.artistId });

      if (album || updateTrackDto.albumId === null) {
        updateData.albumId = updateTrackDto.albumId;
      } else {
        throw new HttpException(
          'Incorrect album ID in request body',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    await this.trackRepo.update(id, updateData);

    return await this.trackRepo.findOneBy({ id: id });
  }

  async deleteTrack(id: string): Promise<void> {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect track ID', HttpStatus.BAD_REQUEST);
    }

    let track: null | TrackEntity = null;

    track = await this.trackRepo.findOneBy({ id: id });

    if (!track) {
      throw new HttpException(
        'Track with entered id not found',
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.trackRepo.delete(id);

      let trackInFavs: null | Partial<TrackEntity> = null;

      trackInFavs = await this.favTracksRepo.findOneBy({ id: id });

      if (trackInFavs) {
        await this.favTracksRepo.delete(id);
      }
    }
  }
}
