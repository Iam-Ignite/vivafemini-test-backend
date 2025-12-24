import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tip, TipDocument } from './tip.schema';

@Injectable()
export class TipsService {
  constructor(
    @InjectModel(Tip.name) private tipModel: Model<TipDocument>,
  ) {}

  async findAll(): Promise<TipDocument[]> {
    return this.tipModel.find().exec();
  }

  async findByCycleDay(cycleDay: number): Promise<TipDocument[]> {
    return this.tipModel.find({
      cycleDays: cycleDay,
    }).exec();
  }

  async findByCategory(category: string): Promise<TipDocument[]> {
    return this.tipModel.find({ category }).exec();
  }

  async create(tipData: Partial<Tip>): Promise<TipDocument> {
    const tip = new this.tipModel(tipData);
    return tip.save();
  }
}
