import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @Length(1, 36)
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @Length(0, 256)
  @IsOptional()
  fullname: string;
}
