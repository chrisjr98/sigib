import { Module } from '@nestjs/common';
import { ProfesorController } from './profesor.controller';
import { ProfesorService } from './profesor.service';
import {ProfesorEntity} from './profesor.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProfesorEntity], 'default')],
  providers: [ProfesorService],
  controllers: [ProfesorController],
  exports: [ProfesorService],
})
export class ProfesorModule {}
