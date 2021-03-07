import { Module } from '@nestjs/common';
import { MatriculaController } from './matricula.controller';
import { MatriculaService } from './matricula.service';
import {MatriculaEntity} from './matricula.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MatriculaEntity], 'default')],
  providers: [MatriculaService],
  controllers: [MatriculaController],
  exports: [MatriculaService],
})
export class MatriculaModule {}
