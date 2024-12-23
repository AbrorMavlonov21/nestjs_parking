import { IsString, IsNotEmpty, IsInt, IsIn } from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsIn(['free', 'occupied', 'maintenance'])
  @IsNotEmpty()
  status: string;

  @IsInt()
  @IsNotEmpty()
  park_id: number;
}
