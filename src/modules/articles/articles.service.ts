import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './article.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<ArticleDocument>,
  ) {}

  async findAll(limit: number = 10): Promise<ArticleDocument[]> {
    return this.articleModel.find({ isPublished: true }).limit(limit).exec();
  }

  async findById(id: string): Promise<ArticleDocument | null> {
    return this.articleModel.findById(id).exec();
  }

  async findByTags(tags: string[]): Promise<ArticleDocument[]> {
    return this.articleModel.find({
      isPublished: true,
      tags: { $in: tags },
    }).exec();
  }

  async create(articleData: Partial<Article>): Promise<ArticleDocument> {
    const article = new this.articleModel(articleData);
    return article.save();
  }
}
