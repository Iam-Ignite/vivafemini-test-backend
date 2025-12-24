import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop()
  excerpt: string;

  @Prop()
  imageUrl: string;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: [String], default: [] })
  relatedCyclePhases: string[];

  @Prop({ default: true })
  isPublished: boolean;

  @Prop({ default: 5 })
  readTimeMinutes: number;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
