import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    })
    @ApiProperty()
    password: string;

    @IsString()
    @ApiProperty()
    name: string;
}