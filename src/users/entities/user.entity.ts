
import { ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";

export class User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty()
    isActive: boolean;

    @ApiProperty()
    password: string;

    @ApiProperty()
    role: UserRole;
}
