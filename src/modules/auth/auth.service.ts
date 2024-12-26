import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResData } from 'lib/resData';
import { JwtService } from './jwt.service';
import { UserService } from '../user/user.service';
import { IUser } from '../user/user.interface';
import { Bcrypt } from 'lib/bcrypt';
import { IAuth } from './login.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}
  async login(dto: IAuth): Promise<ResData<IUser>> {
    const foundUser = await this.userService.getByPhone(dto.phone);
    if (!foundUser) {
      throw new HttpException(
        'login or password is wrong!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const validPassword = await Bcrypt.compare(
      dto.password,
      foundUser.data.password,
    );
    if (!validPassword) {
      throw new HttpException(
        'login or password is wrong!',
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = this.jwtService.generate({
      id: foundUser.data.id,
      roles: foundUser.data.roles,
    });
    const resData = new ResData<IUser>(
      HttpStatus.OK,
      'success',
      foundUser.data,
      {
        token,
      },
    );
    return resData;
  }
  async register(dto: IUser): Promise<ResData<IUser>> {
    const { meta } = await this.userService.getByPhone(dto.phone);

    if (meta.statusCode !== 404) {
      throw new HttpException(
        'User with this phone number already exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    const resData = await this.userService.create(dto);
    return resData;
  }
}
