
import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class LoginDto {
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^(?=.*[A-Z])(?=.*[\W_]).{4,20}$/, { message: 'password too weak' })
    @ApiProperty()
    password: string;
}
