import { Module } from '@nestjs/common';
import { CarreraController } from './carrera.controller';
import { CarreraService } from './carrera.service';
import {CarreraEntity} from './carrera.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CarreraEntity], 'default')],
  providers: [CarreraService],
  controllers: [CarreraController],
  exports: [CarreraService],
})
export class CarreraModule {}
