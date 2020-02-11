import { Module } from '@nestjs/common';
import { RegistroAsistenciaController } from './registro-asistencia.controller';
import { RegistroAsistenciaService } from './registro-asistencia.service';

@Module({
  controllers: [RegistroAsistenciaController],
  providers: [RegistroAsistenciaService]
})
export class RegistroAsistenciaModule {}
