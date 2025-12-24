import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  avatarUrl: string;

  @Prop({ default: 28 })
  averageCycleLength: number;

  @Prop({ default: 5 })
  averagePeriodLength: number;

  @Prop()
  lastPeriodStartDate: Date;

  @Prop({ type: [String], default: [] })
  dismissedCards: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
