import { Controller, Get, Param, Query } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  async getArticles(@Query('limit') limit?: string) {
    return this.articlesService.findAll(parseInt(limit || '10'));
  }

  @Get(':id')
  async getArticle(@Param('id') id: string) {
    return this.articlesService.findById(id);
  }
}
