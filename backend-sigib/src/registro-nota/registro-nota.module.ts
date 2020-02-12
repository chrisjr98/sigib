import { Module } from '@nestjs/common';
import { RegistroNotaController } from './registro-nota.controller';
import { RegistroNotaService } from './registro-nota.service';
import {RegistroNotaEntity} from './registro-nota.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroNotaEntity], 'default')],
  providers: [RegistroNotaService],
  controllers: [RegistroNotaController],
  exports: [RegistroNotaService],
})
export class RegistroNotaModule {}
