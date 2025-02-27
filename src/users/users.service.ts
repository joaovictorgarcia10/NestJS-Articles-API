
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(private readonly prisma: PrismaService) { }

  // Find
  findAll() {
    return this.prisma.users.findMany({ where: { isActive: true } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.users.findUnique({ where: { email, isActive: true } });
  }

  async findById(id: number): Promise<User> {
    return this.prisma.users.findUnique({ where: { id, isActive: true } });
  }

  // Create
  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UsersCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.users.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  // Update
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.users.update({
      where: { id, isActive: true },
      data: updateUserDto,
    });
  }

  // Delete
  async remove(id: number): Promise<User> {
    let user = await this.findById(id);

    const data: Prisma.UsersUpdateInput = {
      ...user,
      isActive: false,
    };

    return this.prisma.users.update({
      where: { id },
      data: data,
    });
  }
}
