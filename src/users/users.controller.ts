import {
  Body, Controller, Delete, Get, Patch, Post, UseGuards, Request,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post()
  // @Roles(UserRole.admin)
  // @UseGuards(AuthGuard, RolesGuard)
  @ApiCreatedResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.admin, UserRole.user)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOkResponse({ type: [User] })
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }


  @Patch(':id')
  @Roles(UserRole.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiCreatedResponse({ type: User })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiResponse({ status: 204, description: 'User successfully deleted.' })
  async remove(@Param('id') id: string): Promise<User> {
    return await this.userService.remove(+id);
  }
}