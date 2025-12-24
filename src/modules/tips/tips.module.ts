import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tip, TipSchema } from './tip.schema';
import { TipsService } from './tips.service';
import { TipsController } from './tips.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tip.name, schema: TipSchema }]),
  ],
  controllers: [TipsController],
  providers: [TipsService],
  exports: [TipsService, MongooseModule],
})
export class TipsModule {}
