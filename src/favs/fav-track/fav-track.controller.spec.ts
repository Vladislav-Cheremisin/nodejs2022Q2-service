import { Test, TestingModule } from '@nestjs/testing';
import { FavTrackController } from './fav-track.controller';

describe('FavTrackController', () => {
  let controller: FavTrackController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FavTrackController],
    }).compile();

    controller = module.get<FavTrackController>(FavTrackController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
