import { ApiProperty } from "@nestjs/swagger";
import { Category } from "src/categories/entities/category.entity";
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
    categories: Category[];
}
