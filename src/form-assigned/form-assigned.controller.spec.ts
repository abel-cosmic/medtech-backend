import { Test, TestingModule } from '@nestjs/testing';
import { FormAssignedController } from './form-assigned.controller';
import { FormAssignedService } from './form-assigned.service';

describe('FormAssignedController', () => {
  let controller: FormAssignedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FormAssignedController],
      providers: [FormAssignedService],
    }).compile();

    controller = module.get<FormAssignedController>(FormAssignedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
