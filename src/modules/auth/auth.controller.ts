import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Roles } from 'roles/roles.decorator';
import { Role } from 'roles/role.enum';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from 'roles/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() createAuthDto: CreateAuthDto) {
    try {
      const resData = await this.authService.login(createAuthDto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to Login',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  @Post('registor')
  @Roles(Role.Admin, Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  async registor(@Body() createUserDto: CreateUserDto) {
    try {
      const resData = await this.authService.register(createUserDto);
      return resData;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to Registor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
