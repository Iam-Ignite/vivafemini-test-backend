import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DailyLogDocument = DailyLog & Document;

@Schema({ timestamps: true })
export class DailyLog {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Cycle' })
  cycleId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: [String], default: [] })
  periodIndicators: string[]; // spotting, heavier_flow, lighter_flow, vaginal_dryness

  @Prop({ type: [String], default: [] })
  sexualHealth: string[]; // increased_sex_drive, decreased_sex_drive, vaginal_discharge

  @Prop({ type: [String], default: [] })
  physicalPain: string[]; // cramps, diarrhea, fatigue, headache, nausea, breast_tenderness, abdominal_pain, pelvic_pain, water_retention, lower_back_pain, appetite_changes

  @Prop({ type: [String], default: [] })
  moodMental: string[]; // happy, neutral, sad, low_motivation, mood_swings, irritability, cravings, tearfulness, difficulty_concentrating

  @Prop({ min: 0, max: 10, default: 0 })
  flowIntensity: number;

  @Prop({ default: '' })
  notes: string;

  @Prop({ default: false })
  isPeriodDay: boolean;
}

export const DailyLogSchema = SchemaFactory.createForClass(DailyLog);
DailyLogSchema.index({ userId: 1, date: -1 });
DailyLogSchema.index({ cycleId: 1 });
