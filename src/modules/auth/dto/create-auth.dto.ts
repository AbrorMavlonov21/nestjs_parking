import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 36)
  @ApiProperty({
    type: String,
    example: '998901112233',
    description: 'Phone number of User ',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'SecPassword1234',
    description: 'User Password ',
  })
  password: string;
}
