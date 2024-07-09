import { Test, TestingModule } from '@nestjs/testing';
import { DataEncoderService } from './data-encoder.service';

describe('DataEncoderService', () => {
  let service: DataEncoderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataEncoderService],
    }).compile();

    service = module.get<DataEncoderService>(DataEncoderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
