import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
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
