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

  @Get()
  @Roles(UserRole.user)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOkResponse({ type: [Article] })
  findAll(@Request() req): Promise<Article[]> {
    return this.articlesService.findAll(req.user.id);
  }

  @Get(':id')
  @Roles(UserRole.user)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOkResponse({ type: Article })
  findOne(@Request() req, @Param('id') id: string): Promise<Article> {
    return this.articlesService.findOne(req.user.id, +id);
  }

  @Post()
  @Roles(UserRole.user)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiCreatedResponse({ type: Article })
  create(@Request() req, @Body() createArticleDto: CreateArticleDto): Promise<Article> {
    return this.articlesService.create(req.user.id, createArticleDto);
  }

  @Patch(':id')
  @Roles(UserRole.user)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiCreatedResponse({ type: Article })

  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto): Promise<Article> {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @Roles(UserRole.user)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({ status: 204, description: 'Article successfully deleted.' })
  remove(@Param('id') id: string): Promise<Article> {
    return this.articlesService.remove(+id);
  }
}
