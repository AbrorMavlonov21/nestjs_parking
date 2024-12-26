import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from './jwt.service';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtService, UserService, UserRepository],
  exports: [JwtService],
})
export class AuthModule {}
