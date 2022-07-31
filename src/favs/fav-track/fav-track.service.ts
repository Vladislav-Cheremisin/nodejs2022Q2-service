import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as uuid from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { FavTrackEntity } from './entities/fav-track.entity';
import { TrackEntity } from 'src/track/entities/track.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavTrackService {
  constructor(
    @InjectRepository(FavTrackEntity)
    private favTrackRepo: Repository<FavTrackEntity>,
    @InjectRepository(TrackEntity)
    private trackRepo: Repository<TrackEntity>,
  ) {}

  async addTrackToFav(id: string): Promise<string> {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect track ID', HttpStatus.BAD_REQUEST);
    }

    let track: null | TrackEntity = null;

    track = await this.trackRepo.findOneBy({ id: id });

    if (track) {
      let trackInFavs: Partial<TrackEntity> | null = null;

      trackInFavs = await this.favTrackRepo.findOneBy({ id: id });

      if (trackInFavs) {
        throw new HttpException(
          'Track with entered ID already exists in favorites list',
          HttpStatus.FORBIDDEN,
        );
      } else {
        const newId = {
          id: id,
        };

        await this.favTrackRepo.save(newId);

        return JSON.stringify({
          message: 'Success! Track was added to favorites',
        });
      }
    } else {
      throw new HttpException(
        `Track with entered ID doesn't exist`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  async removeTrackFromFav(id: string): Promise<void> {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect track ID', HttpStatus.BAD_REQUEST);
    }

    let track: null | Partial<TrackEntity> = null;

    track = await this.favTrackRepo.findOneBy({ id: id });

    if (track) {
      await this.favTrackRepo.delete(id);
    } else {
      throw new HttpException(
        `Track with entered id doesn't exist in favorites list`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
