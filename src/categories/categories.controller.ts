import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Category } from './entities/category.entity';

@Controller('categories')
@ApiTags('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Post()
  @Roles(UserRole.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiCreatedResponse({ type: Category })
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return await this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Roles(UserRole.user)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOkResponse({ type: [Category] })
  async findAll(): Promise<Category[]> {
    return await this.categoriesService.findAll();
  }

  @Patch(':id')
  @Roles(UserRole.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOkResponse({ type: Category })
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return await this.categoriesService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles(UserRole.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOkResponse({ type: Category })
  async remove(@Param('id') id: string): Promise<Category> {
    return await this.categoriesService.remove(+id);
  }
}
