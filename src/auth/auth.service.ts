
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async login(email: string, password: string): Promise<{ access_token: string }> {
        const user = await this.usersService.findByEmail(email);

        if (!user) {
            throw new NotFoundException();
        }

        const validPassword = await this.validatePassword(password, user.password)

        if (!validPassword) {
            throw new UnauthorizedException();
        }

        const payload = { id: user.id, email: user.email, role: user.role };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    async validatePassword(password: string, userPassword: string) {
        return bcrypt.compare(password, userPassword)
    }
}
