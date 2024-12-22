import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { ResData } from 'lib/resData';
import { IUser } from './user.interface';

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}
  async delete(id: number): Promise<ResData<IUser>> {
    const data = await this.repository.delete(id);

    const resData = new ResData(HttpStatus.OK, 'Deleted Successfully', data);

    return resData;
  }
  async update(id: number, dto: UpdateUserDto): Promise<ResData<IUser>> {
    const data = await this.repository.update(id, dto);

    const resData = new ResData<IUser>(
      HttpStatus.OK,
      'Updated Successfully',
      data,
    );

    return resData;
  }
  async getAll(): Promise<ResData<Array<IUser>>> {
    const data = await this.repository.getAll();

    const resData = new ResData<Array<IUser>>(HttpStatus.OK, 'Success', data);

    return resData;
  }
  async create(dto: CreateUserDto): Promise<ResData<IUser>> {
    const data = await this.repository.create(dto);

    const resData = new ResData<IUser>(
      HttpStatus.OK,
      'Created Successfully',
      data,
    );

    return resData;
  }

  async getByPhone(phone: string): Promise<ResData<IUser | undefined>> {
    const data: IUser | undefined = await this.repository.getOneByPhone(phone);

    const resData = new ResData<IUser | undefined>(
      HttpStatus.OK,
      'success',
      data,
    );

    if (!data) {
      resData.meta.statusCode = 404;
      resData.meta.message = 'user not found by phone';
    }

    return resData;
  }

  async getById(id: number): Promise<ResData<IUser>> {
    const data: IUser | undefined = await this.repository.getOneById(id);

    if (!data) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return new ResData<IUser>(HttpStatus.OK, 'success', data);
  }
}
