
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
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post()
    @ApiOkResponse({
        schema: {
            type: 'object',
            properties: {
                access_token: { type: 'string' }
            }
        }
    })
    async login(@Body() body: LoginDto): Promise<{ access_token: string }> {
        return await this.authService.login(body.email, body.password);
    }

    @Get("detail")
    @UseGuards(AuthGuard)
    @ApiOkResponse({ type: User })
    async getDetails(@Request() req): Promise<User> {
        return await this.authService.getDetails(req.user.id);
    }
}
