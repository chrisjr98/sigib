import { Module } from '@nestjs/common';
import { RegistroNotaController } from './registro-nota.controller';
import { RegistroNotaService } from './registro-nota.service';

@Module({
  controllers: [RegistroNotaController],
  providers: [RegistroNotaService]
})
export class RegistroNotaModule {}
