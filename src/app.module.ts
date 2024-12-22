import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { CatchEverythingFilter } from 'lib/exceptionFilter';
import { ParksModule } from './modules/parks/parks.module';

@Module({
  imports: [UserModule, ParksModule],
  providers: [
    {
      provide: APP_FILTER,
      useClass: CatchEverythingFilter,
    },
  ],
})
export class AppModule {}
