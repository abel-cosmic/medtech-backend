import { Test, TestingModule } from '@nestjs/testing';
import { SystemLogController } from './system-log.controller';
import { SystemLogService } from './system-log.service';

describe('SystemLogController', () => {
  let controller: SystemLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SystemLogController],
      providers: [SystemLogService],
    }).compile();

    controller = module.get<SystemLogController>(SystemLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
