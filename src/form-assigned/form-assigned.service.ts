import { Injectable } from '@nestjs/common';
import { CreateFormAssignedDto } from './dto/create-form-assigned.dto';
import { UpdateFormAssignedDto } from './dto/update-form-assigned.dto';

@Injectable()
export class FormAssignedService {
  create(createFormAssignedDto: CreateFormAssignedDto) {
    return 'This action adds a new formAssigned';
  }

  findAll() {
    return `This action returns all formAssigned`;
  }

  findOne(id: number) {
    return `This action returns a #${id} formAssigned`;
  }

  update(id: number, updateFormAssignedDto: UpdateFormAssignedDto) {
    return `This action updates a #${id} formAssigned`;
  }

  remove(id: number) {
    return `This action removes a #${id} formAssigned`;
  }
}
