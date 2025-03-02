import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) { }

  // Create
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const data: Prisma.CategoryCreateInput = {
      ...createCategoryDto,
    };

    return await this.prisma.category.create({ data });
  }

  // Find
  async findAll(): Promise<Category[]> {
    return await this.prisma.category.findMany();
  }

  // Update
  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  // Remove
  async remove(id: number): Promise<Category> {
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
