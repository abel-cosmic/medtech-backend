import { Module } from '@nestjs/common';
import { FormAssignedService } from './form-assigned.service';
import { FormAssignedController } from './form-assigned.controller';

@Module({
  controllers: [FormAssignedController],
  providers: [FormAssignedService],
})
export class FormAssignedModule {}
