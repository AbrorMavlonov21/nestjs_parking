import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PlaceRepository } from './place.repository';
import { ResData } from 'lib/resData';
import { IPlace } from './place.interface';

@Injectable()
export class PlaceService {
  constructor(private readonly repository: PlaceRepository) {}

  async getAll(): Promise<ResData<Array<IPlace>>> {
    const data = await this.repository.getAll();

    const resData = new ResData(HttpStatus.OK, 'Success', data);

    return resData;
  }

  async create(dto: IPlace): Promise<ResData<IPlace>> {
    const data = await this.repository.create(dto);

    const resData = new ResData(HttpStatus.OK, 'Successfully Created', data);

    return resData;
  }

  async update(id: number, dto: IPlace): Promise<ResData<IPlace>> {
    const data = await this.repository.update(id, dto);

    const resData = new ResData(HttpStatus.OK, 'Success Updated', data);

    return resData;
  }
  async delete(id: number): Promise<ResData<IPlace>> {
    const data = await this.repository.delete(id);

    const resData = new ResData(HttpStatus.OK, 'Success Deleted', data);

    return resData;
  }
  async getById(id: number): Promise<ResData<IPlace | undefined>> {
    const data: IPlace | undefined = await this.repository.getById(id);

    if (!data) {
      throw new HttpException('Place not found', HttpStatus.NOT_FOUND);
    }

    return new ResData<IPlace>(HttpStatus.OK, 'Success', data);
  }
}
