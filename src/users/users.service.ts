
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
  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({ where: { isActive: true } });

    return users.map((user) => {
      return {
        ...user,
        password: undefined
      }
    })
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.prisma.user.findUnique({ where: { email, isActive: true } });

    return {
      ...user,
      password: undefined,
    };
  }

  async findById(id: number): Promise<User> {
    const user = this.prisma.user.findUnique({ where: { id, isActive: true } });

    return {
      ...user,
      password: undefined,
    };
  }

  // Create
  async create(createUserDto: CreateUserDto): Promise<User> {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const createdUser = await this.prisma.user.create({ data });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  // Update
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = this.prisma.user.update({
      where: { id, isActive: true },
      data: updateUserDto,
    });

    return {
      ...updatedUser,
      password: undefined,
    };
  }

  // Delete
  async remove(id: number): Promise<User> {
    let user = await this.findById(id);

    const data: Prisma.UserUpdateInput = {
      ...user,
      isActive: false,
    };

    const removedUser = this.prisma.user.update({
      where: { id },
      data: data,
    });

    return {
      ...removedUser,
      password: undefined
    }
  }

}
