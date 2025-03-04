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

    const createdCategory = await this.prisma.category.create({ data });

    return {
      ...createdCategory,
    }
  }

  // Find
  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();

    return categories.map((category) => {
      return {
        ...category,
      };
    });
  }

  // Update
  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });

    return {
      ...updatedCategory,
    }
  }

  // Remove
  async remove(id: number): Promise<Category> {
    const removedCategory = await this.prisma.category.delete({
      where: { id },
    });

    return {
      ...removedCategory,
    }
  }
}
