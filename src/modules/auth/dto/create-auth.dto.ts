import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 36)
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
