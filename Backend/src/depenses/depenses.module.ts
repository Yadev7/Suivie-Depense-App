import { Module } from '@nestjs/common';

import { DepensesController } from './controllers/depenses/depenses.controller';
import { DepensesService } from './services/depenses/depenses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Depense } from 'src/typeorm/entities/Depense';

@Module({
  imports: [TypeOrmModule.forFeature([Depense])],
  controllers: [DepensesController],
  providers: [DepensesService]
})
export class DepensesModule {}
