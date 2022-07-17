import { Test, TestingModule } from '@nestjs/testing';
import { FavAlbumController } from './fav-album.controller';

describe('FavAlbumController', () => {
  let controller: FavAlbumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavAlbumController],
    }).compile();

    controller = module.get<FavAlbumController>(FavAlbumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
