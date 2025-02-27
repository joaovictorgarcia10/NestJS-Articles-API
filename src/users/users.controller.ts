import {
  Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, Request,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @Post()
  @ApiCreatedResponse({ type: User })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ type: User })
  async getDetails(@Request() req): Promise<User> {
    return await this.userService.findById(req.user.id);
  }

  @Patch()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ type: User })
  async update(@Request() req, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.userService.update(req.user.id, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: User })
  async remove(@Request() req): Promise<User> {
    return await this.userService.remove(req.user.id);
  }

}