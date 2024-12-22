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
} from '@nestjs/common';
import { CreateParkDto } from './dto/create-park.dto';
import { UpdateParkDto } from './dto/update-park.dto';
import { ParkService } from './parks.service';
import { UserService } from '../user/user.service';

@Controller('park')
export class ParksController {
  constructor(
    private readonly parkService: ParkService,
    private readonly userService: UserService,
  ) {}

  @Post('create-nestjs')
  async create(@Body() createParkDto: CreateParkDto) {
    try {
      const { meta } = await this.parkService.getByName(createParkDto.name);

      if (meta.statusCode === 200) {
        throw new HttpException(
          'Park with such name already exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.userService.getById(createParkDto.owner);

      const resData = await this.parkService.create(createParkDto);

      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to create park',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-all-nestjs')
  async findAll() {
    try {
      const resData = await this.parkService.getAll();
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find all parks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-nestjs/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const resData = await this.parkService.getById(id);

      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find all parks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('update-nestjs/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateParkDto: UpdateParkDto,
  ) {
    try {
      await this.parkService.getById(id);

      const { meta } = await this.parkService.getByName(updateParkDto.name);
      if (meta.statusCode === 200) {
        throw new HttpException(
          'Park with such name already exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.userService.getById(updateParkDto.owner);

      const resData = await this.parkService.update(id, updateParkDto);

      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find all parks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete-nestjs/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.parkService.getById(id);

      const resData = await this.parkService.delete(id);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find all parks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
