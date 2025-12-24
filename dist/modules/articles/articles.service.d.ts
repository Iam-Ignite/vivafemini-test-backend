import { Model } from 'mongoose';
import { Article, ArticleDocument } from './article.schema';
export declare class ArticlesService {
    private articleModel;
    constructor(articleModel: Model<ArticleDocument>);
    findAll(limit?: number): Promise<ArticleDocument[]>;
    findById(id: string): Promise<ArticleDocument | null>;
    findByTags(tags: string[]): Promise<ArticleDocument[]>;
    create(articleData: Partial<Article>): Promise<ArticleDocument>;
}
