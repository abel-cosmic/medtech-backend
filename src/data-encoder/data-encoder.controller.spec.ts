import { Test, TestingModule } from '@nestjs/testing';
import { DataEncoderController } from './data-encoder.controller';
import { DataEncoderService } from './data-encoder.service';

describe('DataEncoderController', () => {
  let controller: DataEncoderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataEncoderController],
      providers: [DataEncoderService],
    }).compile();

    controller = module.get<DataEncoderController>(DataEncoderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
