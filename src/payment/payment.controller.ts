import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  UsePipes,
  Query,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { GetAllPaymentsDto } from './dto/get-all-payments.dto';
import { Payment } from '@prisma/client';

// import { UserType } from '@/auth/user-type.decorator';
// import { UserTypeGuard } from '@/auth/user-type.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() data: CreatePaymentDto) {
    return this.paymentService.create(data);
  }

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Get()
  findAll(@Query() params?: GetAllPaymentsDto): Promise<{
    message: string;
    data: Payment[];
  }> {
    return this.paymentService.findAll(params);
  }

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @UsePipes(new ValidationPipe())
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaymentDto: UpdatePaymentDto,
  ): Promise<{
    message: string;
    data: Payment;
  }> {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN')
  @Delete(':id')
  @UsePipes(new ValidationPipe())
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
