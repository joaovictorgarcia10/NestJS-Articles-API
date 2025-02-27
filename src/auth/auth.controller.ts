
import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards
} from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './auth.service';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post()
    @ApiCreatedResponse({ type: LoginDto })
    login(@Body() body: LoginDto) {
        return this.authService.login(body.email, body.password);
    }

    @Get("detail")
    @UseGuards(AuthGuard)
    @ApiCreatedResponse({ type: User })
    async getDetails(@Request() req): Promise<User> {
        return await this.authService.getDetails(req.user.id);
    }
}
