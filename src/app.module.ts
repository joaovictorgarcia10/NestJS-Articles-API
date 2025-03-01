import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ArticlesModule } from './articles/articles.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, ArticlesModule, CategoriesModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
