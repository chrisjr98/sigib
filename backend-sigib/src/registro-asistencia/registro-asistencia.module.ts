import { Module } from '@nestjs/common';
import { RegistroAsistenciaController } from './registro-asistencia.controller';
import { RegistroAsistenciaService } from './registro-asistencia.service';
import {RegistroAsistenciaEntity} from './registro-asistencia.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroAsistenciaEntity], 'default')],
  providers: [RegistroAsistenciaService],
  controllers: [RegistroAsistenciaController],
  exports: [RegistroAsistenciaService],
})
export class RegistroAsistenciaModule {}
