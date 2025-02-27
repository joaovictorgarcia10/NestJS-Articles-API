import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { PatientsModule } from './patients/patients.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, PatientsModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
