import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) { }

  // Create
  async create(authorId: number, createArticleDto: CreateArticleDto): Promise<Article> {
    const data: Prisma.ArticleCreateInput = {
      ...createArticleDto,
      author: { connect: { id: authorId } },
      ArticleCategory: {
        create: createArticleDto.ArticleCategory.map((categoryId) => ({
          category: { connect: { id: categoryId } },
        })),
      },
    };

    const createdArticle = await this.prisma.article.create({
      data,
      include: {
        author: true,
        ArticleCategory: { include: { category: true } },
      },
    });

    return {
      ...createdArticle,
    }
  }

  // Find
  async findAll(authorId: number): Promise<Article[]> {
    const articles = await this.prisma.article.findMany({
      where: { authorId: authorId },
      include: {
        author: true,
        ArticleCategory: { include: { category: true } },
      },
    });

    return articles.map((article) => {
      return {
        ...article,
      };
    });
  }

  async findOne(authorId: number, articleId: number): Promise<Article> {
    const article = await this.prisma.article.findUnique({
      where: { id: articleId, authorId: authorId },
      include: {
        author: true,
        ArticleCategory: { include: { category: true } },
      },
    });

    return {
      ...article,
    };
  }

  // Update
  async update(authorId: number, articleId: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    // If ArticleCategory is provided in the request
    if (updateArticleDto.ArticleCategory) {
      // Delete existing ArticleCategory connections
      await this.prisma.articleCategory.deleteMany({
        where: {
          articleId: articleId,
        },
      });
    }

    // Update the article
    const data: Prisma.ArticleUpdateInput = {
      ...updateArticleDto,
      author: { connect: { id: authorId } },
      ArticleCategory: {
        create: updateArticleDto.ArticleCategory?.map((categoryId) => ({
          category: { connect: { id: categoryId } },
        })),
      },
    };

    const updatedArticle = await this.prisma.article.update({
      where: { id: articleId },
      data: data,
      include: {
        author: true,
        ArticleCategory: { include: { category: true } },
      },
    });


    return {
      ...updatedArticle,
    };
  }

  // Delete
  async remove(articleId: number): Promise<Article> {
    // Delete existing ArticleCategory connections
    await this.prisma.articleCategory.deleteMany({
      where: {
        articleId: articleId,
      },
    });

    // Delete the article
    const removedArticle = await this.prisma.article.delete({
      where: { id: articleId },
      include: {
        author: true,
        ArticleCategory: { include: { category: true } },
      },
    });

    return {
      ...removedArticle,
    };
  }
}
