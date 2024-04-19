import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Project } from './typeorm/entities/Project';
import { ProjectsModule } from './projects/projects.module';

import { Depense } from './typeorm/entities/Depense';
import { DepensesModule } from './depenses/depenses.module';

import { Revenu } from './typeorm/entities/Revenu';
import { RevenusModule } from './revenus/revenus.module';

import { User } from './typeorm/entities/User';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UsersController } from './users/controllers/users/users.controller';
import { UsersService } from './users/services/users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from './auth/constants';
import { FilesController } from './files.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'NewDevDB2',
      entities: [Project, User, Depense, Revenu],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
    ProjectsModule,
    DepensesModule,
    RevenusModule,

    JwtModule.register({
      secret: JWT_SECRET,
      // signOptions: { expiresIn: '24h' },
    }),

    DepensesModule,
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    FilesController,
  ],
  providers: [AppService, AuthService, UsersService, JwtService],
})
export class AppModule {}
