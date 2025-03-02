import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Article } from './entities/article.entity';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) { }

  @Post()
  @Roles(UserRole.user)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiCreatedResponse({ type: Article })
  async create(@Request() req, @Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articlesService.create(req.user.id, createArticleDto);
  }

  @Get()
  @Roles(UserRole.user)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOkResponse({ type: [Article] })
  async findAll(@Request() req): Promise<Article[]> {
    return await this.articlesService.findAll(req.user.id);
  }

  @Get(':id')
  @Roles(UserRole.user)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOkResponse({ type: Article })
  async findOne(@Request() req, @Param('id') id: string): Promise<Article> {
    return await this.articlesService.findOne(req.user.id, +id);
  }


  @Patch(':articleId')
  @Roles(UserRole.user)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiCreatedResponse({ type: Article })
  async update(@Request() req, @Param('articleId') articleId: string, @Body() updateArticleDto: UpdateArticleDto) {
    return await this.articlesService.update(req.user.id, +articleId, updateArticleDto);
  }

  @Delete(':id')
  @Roles(UserRole.user)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({ status: 204, description: 'Article successfully deleted.' })
  async remove(@Param('id') id: string): Promise<Article> {
    return await this.articlesService.remove(+id);
  }
}
