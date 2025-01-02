import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  @Length(1, 36)
  @ApiProperty({
    type: String,
    example: '998901112233',
    description: 'phone number of user',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'SecPassword1234',
    description: 'Password of User ',
  })
  password: string;

  @IsString()
  @Length(0, 256)
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    example: 'John Doe',
    description: 'Full name of the user',
  })
  fullname?: string;
}
