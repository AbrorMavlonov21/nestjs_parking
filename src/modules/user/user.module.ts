import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { AuthGuard } from '../auth/auth.guard';
import { JwtService } from '../auth/jwt.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository, AuthGuard, JwtService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
