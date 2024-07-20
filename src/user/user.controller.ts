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
import { CreateUserDto, UserType } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from '@/auth/auth.service';
import { User } from '@prisma/client';
import { AuthPayloadDto } from '@/auth/dto/auth.dto';
import { LocalAuthGuard } from '@/auth/local.auth.guard';
// import { UserTypeGuard } from '@/auth/user-type.guard';
// import { UserType } from '@/auth/user-type.decorator';
import { GetAllUsersDto } from './dto/get-all-user.dto';
import { GetUsersByTypeDto } from './dto/get-user-by-user-type.dto';

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
      pricePerForm,
    } = data;
    try {
      return await this.userService.create(
        userType,
        firstName,
        lastName,
        username,
        phoneNumber,
        password,
        pricePerForm,
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

  // @UseGuards(UserTypeGuard)
  // @UserType('SUPERADMIN', 'ADMIN')
  @Get()
  findAll(@Query() params?: GetAllUsersDto): Promise<{
    message: string;
    data: UserWithoutPassword[];
  }> {
    return this.userService.findAll(params);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('by-type')
  @UsePipes(new ValidationPipe())
  async findAllByType(
    @Query('userType') userType: UserType,
  ): Promise<{ message: string; data: UserWithoutPassword[] }> {
    return await this.userService.findAllByType(userType);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }
}
