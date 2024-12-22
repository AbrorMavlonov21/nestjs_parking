import { ResData } from 'lib/resData';
import { ParkRepository } from './park.repository';
import { IPark } from './parks.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ParkService {
  constructor(private repository: ParkRepository) {}
  async getByName(name: string): Promise<ResData<IPark>> {
    const data = await this.repository.getByName(name);

    if (!data) {
      return new ResData<IPark>(404, 'Park not found', data);
    }
    return new ResData<IPark>(HttpStatus.OK, 'Success', data);
  }

  async create(dto: IPark): Promise<ResData<IPark>> {
    const data = await this.repository.create(dto);

    const resData = new ResData(HttpStatus.OK, 'Successfully Created', data);

    return resData;
  }

  async update(id: number, dto: IPark): Promise<ResData<IPark>> {
    const data = await this.repository.update(id, dto);

    const resData = new ResData(HttpStatus.OK, 'Successfully Updated', data);

    return resData;
  }

  async delete(id: number): Promise<ResData<IPark>> {
    const data = await this.repository.delete(id);

    const resData = new ResData(HttpStatus.OK, 'Successfully Deleted', data);

    return resData;
  }

  async getById(id: number): Promise<ResData<IPark | undefined>> {
    const data: IPark | undefined = await this.repository.getById(id);

    if (!data) {
      throw new HttpException('Park not found', HttpStatus.NOT_FOUND);
    }

    return new ResData<IPark>(HttpStatus.OK, 'Success', data);
  }

  async getAll(): Promise<ResData<Array<IPark>>> {
    const data = await this.repository.getAll();

    return new ResData<Array<IPark>>(HttpStatus.OK, 'Success', data);
  }
}
