import { Test, TestingModule } from '@nestjs/testing';
import { FormAssignedService } from './form-assigned.service';

describe('FormAssignedService', () => {
  let service: FormAssignedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FormAssignedService],
    }).compile();

    service = module.get<FormAssignedService>(FormAssignedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
