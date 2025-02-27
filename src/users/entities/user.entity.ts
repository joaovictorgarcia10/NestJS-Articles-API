
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
import { Exclude } from "class-transformer";

export class User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @Exclude()
    password: string;

    @ApiProperty()
    role: UserRole;
}
