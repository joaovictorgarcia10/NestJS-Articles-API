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
        create: createArticleDto.categories?.map((categoryId) => ({
          category: { connect: { id: categoryId } },
        })),
      },
    };

    const createdArticle = await this.prisma.article.create({
      data,
      include: {
        ArticleCategory: { include: { category: true } },
      },
    });

    return {
      id: createdArticle.id,
      title: createdArticle.title,
      description: createdArticle.description,
      createdAt: createdArticle.createdAt,
      updatedAt: createdArticle.updatedAt,
      categories: createdArticle.ArticleCategory.map((articleCategory) => {
        return {
          id: articleCategory.category.id,
          title: articleCategory.category.title,
        }
      }),
    };
  }

  // Find
  async findAll(authorId: number): Promise<Article[]> {
    const articles = await this.prisma.article.findMany({
      where: { authorId: authorId },
      include: {
        ArticleCategory: { include: { category: true } },
      },
    });

    return articles.map((article) => {
      return {
        id: article.id,
        title: article.title,
        description: article.description,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        categories: article.ArticleCategory.map((articleCategory) => {
          return {
            id: articleCategory.category.id,
            title: articleCategory.category.title,
          }
        }),
      };
    });
  }

  async findOne(authorId: number, articleId: number): Promise<Article> {
    const article = await this.prisma.article.findUnique({
      where: { id: articleId, authorId: authorId },
      include: {
        ArticleCategory: { include: { category: true } },
      },
    });

    return {
      id: article.id,
      title: article.title,
      description: article.description,
      createdAt: article.createdAt,
      updatedAt: article.updatedAt,
      categories: article.ArticleCategory.map((articleCategory) => {
        return {
          id: articleCategory.category.id,
          title: articleCategory.category.title,
        }
      }),
    };
  }

  // Update
  async update(authorId: number, articleId: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    // If categories property is provided in the request
    if (updateArticleDto.categories) {
      // Delete existing categories connections
      await this.prisma.articleCategory.deleteMany({
        where: {
          articleId: articleId,
        },
      });
    }

    // Update the article
    const data: Prisma.ArticleUpdateInput = {
      title: updateArticleDto.title,
      description: updateArticleDto.description,
      author: { connect: { id: authorId } },
      ArticleCategory: {
        create: updateArticleDto.categories?.map((categoryId) => ({
          category: { connect: { id: categoryId } },
        })),
      },
    };

    const updatedArticle = await this.prisma.article.update({
      where: { id: articleId },
      data: data,
      include: {
        ArticleCategory: { include: { category: true } },
      },
    });

    return {
      id: updatedArticle.id,
      title: updatedArticle.title,
      description: updatedArticle.description,
      createdAt: updatedArticle.createdAt,
      updatedAt: updatedArticle.updatedAt,
      categories: updatedArticle.ArticleCategory.map((articleCategory) => {
        return {
          id: articleCategory.category.id,
          title: articleCategory.category.title,
        }
      }),
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
        ArticleCategory: { include: { category: true } },
      },
    });

    return {
      id: removedArticle.id,
      title: removedArticle.title,
      description: removedArticle.description,
      createdAt: removedArticle.createdAt,
      updatedAt: removedArticle.updatedAt,
      categories: removedArticle.ArticleCategory.map((articleCategory) => {
        return {
          id: articleCategory.category.id,
          title: articleCategory.category.title,
        }
      }),
    };
  }
}
