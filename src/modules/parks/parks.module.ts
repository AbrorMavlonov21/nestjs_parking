import { Module } from '@nestjs/common';
import { ParksController } from './parks.controller';
import { ParkRepository } from './park.repository';
import { ParkService } from './parks.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ParksController],
  providers: [ParkService, ParkRepository],
  exports: [ParkService],
})
export class ParksModule {}
