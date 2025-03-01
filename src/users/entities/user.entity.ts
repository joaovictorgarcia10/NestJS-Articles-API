
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { UserRole } from "@prisma/client";
 
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

    @ApiHideProperty()
    password: string;

    @ApiProperty()
    role: UserRole;
}
