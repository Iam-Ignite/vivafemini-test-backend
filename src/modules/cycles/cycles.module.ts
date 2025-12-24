import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cycle, CycleSchema } from './cycle.schema';
import { CyclesService } from './cycles.service';
import { CyclesController } from './cycles.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cycle.name, schema: CycleSchema }]),
    UsersModule,
  ],
  controllers: [CyclesController],
  providers: [CyclesService],
  exports: [CyclesService, MongooseModule],
})
export class CyclesModule {}
