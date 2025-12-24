import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TipDocument = Tip & Document;

@Schema({ timestamps: true })
export class Tip {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  icon: string;

  @Prop({ type: [Number], default: [] })
  cycleDays: number[];

  @Prop()
  category: string;

  @Prop()
  actionText: string;
}

export const TipSchema = SchemaFactory.createForClass(Tip);
