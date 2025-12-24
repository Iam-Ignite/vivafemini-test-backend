import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CycleDocument = Cycle & Document;

@Schema({ timestamps: true })
export class Cycle {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  cycleLength: number;

  @Prop()
  periodLength: number;

  @Prop({ default: false })
  isActive: boolean;

  @Prop()
  ovulationDate: Date;

  @Prop({ type: Object })
  fertileWindow: {
    start: Date;
    end: Date;
  };

  @Prop({ type: Object })
  pregnancyTestResult: {
    taken: boolean;
    result: 'positive' | 'negative' | 'faint' | 'not_taken';
    date: Date;
  };
}

export const CycleSchema = SchemaFactory.createForClass(Cycle);
CycleSchema.index({ userId: 1, startDate: -1 });
