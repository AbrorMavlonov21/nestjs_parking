import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateParkDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsInt()
  @IsNotEmpty()
  owner: number;
}
