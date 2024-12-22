import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';
import { BaseRepository } from 'lib/repository';

type CreateArgs = number | string | null;

@Injectable()
export class UserRepository extends BaseRepository {
  async getAll(): Promise<Array<IUser>> {
    return await this.multiple<IUser, undefined>('select * from users');
  }
  async create(dto: IUser): Promise<IUser> {
    return (await this.single<IUser, CreateArgs>(
      'INSERT INTO users (phone , password, fullname) values ($1, $2, $3) returning *',
      dto.phone,
      dto.password,
      dto.fullname,
    )) as IUser;
  }
  async update(id: number, dto: IUser): Promise<IUser> {
    return (await this.single<IUser, CreateArgs>(
      'UPDATE users SET phone = $1, password = $2, fullname = $3 where id =$4 RETURNING *',
      dto.phone,
      dto.password,
      dto.fullname,
      id,
    )) as IUser;
  }
  async delete(id: number): Promise<IUser> {
    return (await this.single<IUser, number>(
      'delete from users where id =$1',
      id,
    )) as IUser;
  }

  async getOneById(id: number): Promise<IUser | undefined> {
    return await this.single<IUser, number>(
      'SELECT * FROM users WHERE id = $1',
      id,
    );
  }
  async getOneByPhone(phone: string): Promise<IUser | undefined> {
    return await this.single<IUser, string>(
      'SELECT * FROM users WHERE phone = $1',
      phone,
    );
  }
}