import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/entities/user.entity";

export class Article {
    @ApiProperty()
    id: number;

    @ApiProperty()
    title: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    author: User;

    @ApiProperty()
    authorId: number;
}
