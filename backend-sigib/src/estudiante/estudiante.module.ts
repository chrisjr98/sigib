import { Module } from '@nestjs/common';
import { EstudianteController } from './estudiante.controller';
import { EstudianteService } from './estudiante.service';
import {EstudianteEntity} from './estudiante.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EstudianteEntity], 'default')],
  providers: [EstudianteService],
  controllers: [EstudianteController],
  exports: [EstudianteService],
})
export class EstudianteModule {}
