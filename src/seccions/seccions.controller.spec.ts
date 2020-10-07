import { Test, TestingModule } from '@nestjs/testing';
import { SeccionsController } from './seccions.controller';

describe('SeccionsController', () => {
  let controller: SeccionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeccionsController],
    }).compile();

    controller = module.get<SeccionsController>(SeccionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
