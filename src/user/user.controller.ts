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
  UseGuards,
  BadRequestException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '@/auth/auth.service';
import { User } from '@prisma/client';
import { AuthPayloadDto } from '@/auth/dto/auth.dto';
import { LocalAuthGuard } from '@/auth/local.auth.guard';
import { UserTypeGuard } from '@/auth/user-type.guard';
import { UserType } from '@/auth/user-type.decorator';
import { GetAllUsersDto } from './dto/get-all-user.dto';

type UserWithoutPassword = Omit<User, 'password'>;
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async create(
    @Body() data: CreateUserDto,
  ): Promise<{ message: string; data: UserWithoutPassword }> {
    const {
      userType,
      firstName,
      lastName,
      username,
      phoneNumber,
      password,
      branchId,
    } = data;
    try {
      return await this.userService.create(
        userType,
        firstName,
        lastName,
        username,
        phoneNumber,
        password,
        branchId,
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() data: AuthPayloadDto) {
    const user = await this.authService.validateUser(
      data.username,
      data.password,
    );
    if (!user) {
      throw new NotFoundException('Invalid login credentials');
    }
    return this.authService.login(user);
  }

  @UseGuards(UserTypeGuard)
  @UserType('SUPERADMIN', 'ADMIN')
  @Get()
  findAll(@Query() params?: GetAllUsersDto): Promise<{
    message: string;
    data: User[];
  }> {
    return this.userService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
