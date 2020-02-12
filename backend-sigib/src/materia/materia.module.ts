import { Module } from '@nestjs/common';
import { MateriaController } from './materia.controller';
import { MateriaService } from './materia.service';
import {MateriaEntity} from './materia.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MateriaEntity], 'default')],
  providers: [MateriaService],
  controllers: [MateriaController],
  exports: [MateriaService],
})
export class MateriaModule {}
