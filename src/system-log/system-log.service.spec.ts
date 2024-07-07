import { Test, TestingModule } from '@nestjs/testing';
import { SystemLogService } from './system-log.service';

describe('SystemLogService', () => {
  let service: SystemLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SystemLogService],
    }).compile();

    service = module.get<SystemLogService>(SystemLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
