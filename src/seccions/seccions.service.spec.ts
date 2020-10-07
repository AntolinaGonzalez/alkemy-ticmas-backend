import { Test, TestingModule } from '@nestjs/testing';
import { SeccionsService } from './seccions.service';

describe('SeccionsService', () => {
  let service: SeccionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeccionsService],
    }).compile();

    service = module.get<SeccionsService>(SeccionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
