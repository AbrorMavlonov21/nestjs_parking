import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './user.interface';
import { ResData } from 'lib/resData';
import { Role } from 'roles/role.enum';
import { Roles } from 'roles/roles.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { RolesGuard } from 'roles/roles.guard';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-nestjs')
  @ApiBody({ type: CreateUserDto })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({ status: 201, description: 'User created Successfully' })
  @ApiResponse({ status: 400, description: 'Validation error or user exists' })
  async create(@Body() dto: CreateUserDto) {
    try {
      const { meta } = await this.userService.getByPhone(dto.phone);

      if (meta.statusCode !== 404) {
        throw new HttpException(
          'User with this phone number already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      const resData = await this.userService.create(dto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @ApiResponse({ status: 200, description: 'Get all Users' })
  @ApiResponse({ status: 400, description: 'Fail to find all users' })
  @Get('get-all-nestjs')
  async findAll(): Promise<ResData<IUser[]>> {
    try {
      const resData = await this.userService.getAll();

      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Fail to find all users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 400, description: 'Failed to find user' })
  @Get('get-nestjs/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const resData = await this.userService.getById(id);

      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @ApiBody({ type: UpdateUserDto })
  @ApiParam({ name: 'id', description: 'User ID' })
  @ApiResponse({ status: 200, description: 'User Successfully Updated' })
  @ApiResponse({ status: 400, description: 'Failed to update user' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Patch('update-nestjs/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    try {
      const { meta } = await this.userService.getByPhone(dto.phone);

      if (meta.statusCode !== 404) {
        throw new HttpException(
          'User with this phone number already exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.userService.getById(id);

      const resData = await this.userService.update(id, dto);

      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @ApiResponse({ status: 200, description: 'User Successfully deleted' })
  @ApiResponse({ status: 400, description: 'Failed to delete user' })
  @Delete('delete-nestjs/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.userService.getById(id);

      const resData = await this.userService.delete(id);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Fail to delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
