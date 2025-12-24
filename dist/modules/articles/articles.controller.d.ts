import { ArticlesService } from './articles.service';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    getArticles(limit?: string): Promise<import("./article.schema").ArticleDocument[]>;
    getArticle(id: string): Promise<import("./article.schema").ArticleDocument | null>;
}
