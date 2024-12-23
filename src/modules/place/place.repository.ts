import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'lib/repository';
import { IPlace } from './place.interface';

type CreateArgs = number | string;

@Injectable()
export class PlaceRepository extends BaseRepository {
  async getAll(): Promise<Array<IPlace>> {
    return await this.multiple<IPlace, undefined>('Select * from places');
  }
  async create(dto: IPlace): Promise<IPlace> {
    return (await this.single<IPlace, CreateArgs>(
      'Insert into places (name, status, park_id) values ($1, $2, $3) returning *',
      dto.name,
      dto.status,
      dto.park_id,
    )) as IPlace;
  }
  async update(id: number, dto: IPlace): Promise<IPlace> {
    return (await this.single<IPlace, CreateArgs>(
      'UPDATE places SET name =$1, status =$2, park_id =$3 where id =$4 RETURNING *',
      dto.name,
      dto.status,
      dto.park_id,
      id,
    )) as IPlace;
  }
  async delete(id: number): Promise<IPlace> {
    return (await this.single<IPlace, number>(
      'DELETE FROM places where id =$1',
      id,
    )) as IPlace;
  }
  async getById(id: number): Promise<IPlace | undefined> {
    return await this.single<IPlace | undefined, number>(
      'select * from places where id = $1',
      id,
    );
  }
}
