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
import { PlaceService } from './place.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import { ParkService } from '../parks/parks.service';

@Controller('place')
export class PlaceController {
  constructor(
    private readonly placeService: PlaceService,
    private readonly parkService: ParkService,
  ) {}

  @Post('create-nestjs')
  async create(@Body() createPlaceDto: CreatePlaceDto) {
    try {
      await this.parkService.getById(createPlaceDto.park_id);

      const resData = await this.placeService.create(createPlaceDto);

      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to Create Place',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-all-nestjs')
  async findAll() {
    try {
      const resData = await this.placeService.getAll();

      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find all places',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('get-nestjs/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const resData = await this.placeService.getById(id);

      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to find a Place',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch('update-nestjs/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlaceDto: UpdatePlaceDto,
  ) {
    try {
      await this.placeService.getById(id);

      await this.parkService.getById(updatePlaceDto.park_id);

      const resData = await this.placeService.update(id, updatePlaceDto);

      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.error('Unexpected error:', error);
      throw new HttpException(
        'Failed to update Place',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('delete-nestjs/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.placeService.getById(id);

      const resData = await this.placeService.delete(id);

      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to Create Place',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
