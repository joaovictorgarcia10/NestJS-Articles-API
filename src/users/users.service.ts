
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

  async findAll(): Promise<User[]> {
    return await this.prisma.users.findMany({ where: { isDeleted: false } });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.users.findUnique({ where: { email, isDeleted: false } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.prisma.users.update({
      where: { id, isDeleted: false },
      data: updateUserDto,
    });
  }

  async remove(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const data: Prisma.UsersUpdateInput = {
      ...updateUserDto,
      isDeleted: true,
    };

    return this.prisma.users.update({
      where: { id },
      data: data,
    });
  }
}
