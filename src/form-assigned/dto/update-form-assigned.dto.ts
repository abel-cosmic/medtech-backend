import { PartialType } from '@nestjs/swagger';
import { CreateFormAssignedDto } from './create-form-assigned.dto';

export class UpdateFormAssignedDto extends PartialType(CreateFormAssignedDto) {}
