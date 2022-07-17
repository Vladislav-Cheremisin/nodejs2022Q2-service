import { Test, TestingModule } from '@nestjs/testing';
import { FavArtistController } from './fav-artist.controller';

describe('FavArtistController', () => {
  let controller: FavArtistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavArtistController],
    }).compile();

    controller = module.get<FavArtistController>(FavArtistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
