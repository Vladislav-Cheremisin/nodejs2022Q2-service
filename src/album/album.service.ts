import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from 'src/interfaces';
import * as uuid from 'uuid';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumEntity } from './entities/album.entity';
import { Repository } from 'typeorm';
import { ArtistEntity } from 'src/artist/entities/artist.entity';
import { FavAlbumEntity } from 'src/favs/fav-album/entities/fav-album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(AlbumEntity)
    private albumRepo: Repository<AlbumEntity>,
    @InjectRepository(ArtistEntity)
    private artistRepo: Repository<ArtistEntity>,
    @InjectRepository(FavAlbumEntity)
    private favAlbumsRepo: Repository<FavAlbumEntity>,
  ) {}

  async getAlbums(): Promise<AlbumEntity[]> {
    return await this.albumRepo.find();
  }

  async getAlbum(id: string): Promise<AlbumEntity> {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect album ID', HttpStatus.BAD_REQUEST);
    }

    let result: null | AlbumEntity = null;

    result = await this.albumRepo.findOneBy({ id: id });

    if (result === null) {
      throw new HttpException(
        'Album with entered id not found',
        HttpStatus.NOT_FOUND,
      );
    } else {
      return result;
    }
  }

  async createAlbum(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    if (
      typeof createAlbumDto.name === 'string' &&
      typeof createAlbumDto.year === 'number'
    ) {
      const album: Album = {
        id: uuid.v4(),
        name: createAlbumDto.name,
        year: createAlbumDto.year,
        artistId: null,
      };

      if (typeof createAlbumDto.artistId === 'string') {
        let artist = null;

        artist = await this.artistRepo.findOneBy({
          id: createAlbumDto.artistId,
        });

        if (artist) {
          album.artistId = createAlbumDto.artistId;
        }
      }

      return await this.albumRepo.save(album);
    } else {
      throw new HttpException(
        'incorrect request body, fields name and duration are required',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateAlbum(
    updateAlbumDto: UpdateAlbumDto,
    id: string,
  ): Promise<AlbumEntity> {
    await this.getAlbum(id);

    const updateData: Partial<AlbumEntity> = {};

    if (updateAlbumDto.name) {
      if (typeof updateAlbumDto.name === 'string') {
        updateData.name = updateAlbumDto.name;
      } else {
        throw new HttpException(
          'Incorrect name in request body',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (updateAlbumDto.year) {
      if (typeof updateAlbumDto.year === 'number') {
        updateData.year = updateAlbumDto.year;
      } else {
        throw new HttpException(
          'Incorrect year in request body',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (updateAlbumDto.artistId) {
      let artist: null | ArtistEntity = null;

      artist = await this.artistRepo.findOneBy({ id: updateAlbumDto.artistId });

      if (artist || updateAlbumDto.artistId === null) {
        updateData.artistId = updateAlbumDto.artistId;
      } else {
        throw new HttpException(
          'Incorrect artist ID in request body',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    await this.albumRepo.update(id, updateData);

    return await this.albumRepo.findOneBy({ id: id });
  }

  async deleteAlbum(id: string): Promise<void> {
    if (!uuid.validate(id)) {
      throw new HttpException('Incorrect album ID', HttpStatus.BAD_REQUEST);
    }

    let album = null;

    album = await this.albumRepo.findOneBy({ id: id });

    if (!album) {
      throw new HttpException(
        'Album with entered id not found',
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.albumRepo.delete(id);

      let albumInFavs: null | Partial<AlbumEntity> = null;

      albumInFavs = await this.favAlbumsRepo.findOneBy({ id: id });

      if (albumInFavs) {
        await this.favAlbumsRepo.delete(id);
      }
    }
  }
}
