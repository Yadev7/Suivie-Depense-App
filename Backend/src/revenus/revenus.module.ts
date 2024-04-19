import { Module } from '@nestjs/common';
import { RevenusController } from './controllers/revenus/revenus.controller';
import { RevenusService } from './services/revenus.service';
import { Revenu } from 'src/typeorm/entities/Revenu';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Revenu])],
    controllers: [RevenusController],
    providers: [RevenusService]
  })
export class RevenusModule {}
