import { Module } from '@nestjs/common';
import { CursoController } from './curso.controller';
import { CursoService } from './curso.service';
import {CursoEntity} from './curso.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CursoEntity], 'default')],
  providers: [CursoService],
  controllers: [CursoController],
  exports: [CursoService],
})
export class CursoModule {}
