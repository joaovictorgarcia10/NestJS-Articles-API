import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) { }

  // Find
  async findAll(authorId: number): Promise<Article[]> {
    return await this.prisma.article.findMany({
      where: { authorId: authorId },
      include: { author: true },
    });
  }

  async findOne(authorId: number, articleId: number): Promise<Article> {
    return await this.prisma.article.findUnique({
      where: { id: articleId, authorId: authorId },
      include: { author: true },
    });
  }

  // Create
  async create(authorId: number, createArticleDto: CreateArticleDto): Promise<Article> {
    const data: Prisma.ArticleCreateInput = {
      ...createArticleDto,
      author: { connect: { id: authorId } },
    };

    return await this.prisma.article.create({
      data,
      include: { author: true },
    });
  }

  // Update
  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    return await this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
      include: { author: true },
    });
  }

  // Delete
  async remove(id: number): Promise<Article> {
    return await this.prisma.article.delete({
      where: { id },
      include: { author: true },
    });
  }
}
