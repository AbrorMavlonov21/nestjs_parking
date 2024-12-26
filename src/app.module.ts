import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from 'lib/exceptionFilter';
import { ParksModule } from './modules/parks/parks.module';
import { PlaceModule } from './modules/place/place.module';
import { AuthModule } from './modules/auth/auth.module';
@Module({
  imports: [UserModule, ParksModule, PlaceModule, AuthModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
  ],
})
export class AppModule {}
