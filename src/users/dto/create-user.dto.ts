import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import {
    IsEmail,
    IsEnum,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto extends User {
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^(?=.*[A-Z])(?=.*[\W_]).{4,20}$/, { message: 'password too weak' })
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    name: string;

    @IsEnum(UserRole)
    @ApiProperty()
    role: UserRole;
}