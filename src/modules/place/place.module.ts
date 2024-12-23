import { Module } from '@nestjs/common';
import { PlaceService } from './place.service';
import { PlaceController } from './place.controller';
import { PlaceRepository } from './place.repository';
import { ParksModule } from '../parks/parks.module';

@Module({
  imports: [ParksModule],
  controllers: [PlaceController],
  providers: [PlaceService, PlaceRepository],
})
export class PlaceModule {}
