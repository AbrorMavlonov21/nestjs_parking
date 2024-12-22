import { BaseRepository } from 'lib/repository';
import { IPark } from './parks.interface';
import { Injectable } from '@nestjs/common';

type CreateArgs = number | string | null;

@Injectable()
export class ParkRepository extends BaseRepository {
  async getByName(name: string): Promise<IPark> {
    return (await this.single<IPark, string>(
      'select * from parks where name = $1',
      name,
    )) as IPark;
  }

  async update(id: number, dto: IPark): Promise<IPark> {
    return (await this.single<IPark, CreateArgs>(
      'UPDATE parks SET name=$1, phone=$2, owner=$3 where id=$4 RETURNING *',
      dto.name,
      dto.phone,
      dto.owner,
      id,
    )) as IPark;
  }

  async delete(id: number): Promise<IPark> {
    return (await this.single<IPark, number>(
      'DELETE FROM parks where id = $1 returning *',
      id,
    )) as IPark;
  }

  async getAll(): Promise<Array<IPark>> {
    return await this.multiple<IPark, undefined>('select * from parks');
  }

  async create(dto: IPark): Promise<IPark> {
    return (await this.single<IPark, CreateArgs>(
      'insert into parks (name, phone, owner) values ($1, $2, $3) returning *',
      dto.name,
      dto.phone,
      dto.owner,
    )) as IPark;
  }
  async getById(id: number): Promise<IPark | undefined> {
    return await this.single<IPark | undefined, number>(
      'select * from parks where id = $1',
      id,
    );
  }
}
