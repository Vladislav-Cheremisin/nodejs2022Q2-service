import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from 'src/interfaces';
import * as uuid from 'uuid';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { FavArtistEntity } from 'src/favs/fav-artist/entities/fav-artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepo: Repository<ArtistEntity>,
    @InjectRepository(FavArtistEntity)
    private favArtistRepo: Repository<FavArtistEntity>,
  ) {}

  async getArtists(): Promise<ArtistEntity[]> {
    return await this.artistRepo.find();
  }

  async getArtist(id: string): Promise<ArtistEntity> {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect artist ID', HttpStatus.BAD_REQUEST);
    }

    let result: null | ArtistEntity = null;

    result = await this.artistRepo.findOneBy({ id: id });

    if (result === null) {
      throw new HttpException(
        'Artist with entered id not found',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return result;
    }
  }

  async createArtist(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    if (
      typeof createArtistDto.name === 'string' &&
      typeof createArtistDto.grammy === 'boolean'
    ) {
      const artist: Artist = {
        id: uuid.v4(),
        name: createArtistDto.name,
        grammy: createArtistDto.grammy,
      };

      const dbArtist = this.artistRepo.create(artist);

      return await this.artistRepo.save(dbArtist);
    } else {
      throw new HttpException(
        'incorrect request body, fields name and duration are required',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateArtist(
    updateArtistDto: UpdateArtistDto,
    id: string,
  ): Promise<ArtistEntity> {
    await this.getArtist(id);

    if (typeof updateArtistDto.name !== 'string') {
      throw new HttpException(
        'Incorrect name in request body',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (typeof updateArtistDto.grammy !== 'boolean') {
      throw new HttpException(
        'Incorrect grammy data in request body, use true or false',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.artistRepo.update(id, updateArtistDto);

    return this.artistRepo.findOneBy({ id: id });
  }

  async deleteArtist(id: string): Promise<void> {
    await this.getArtist(id);

    this.artistRepo.delete(id);

    let artistInFavs: null | Partial<ArtistEntity> = null;

    artistInFavs = await this.favArtistRepo.findOneBy({ id: id });

    if (artistInFavs) {
      await this.favArtistRepo.delete(id);
    }
  }
}
