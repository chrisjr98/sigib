import { Module } from '@nestjs/common';
import { ComprobanteController } from './comprobante.controller';
import { ComprobanteService } from './comprobante.service';
import {ComprobanteEntity} from './comprobante.entity';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ComprobanteEntity], 'default')],
  providers: [ComprobanteService],
  controllers: [ComprobanteController],
  exports: [ComprobanteService],
})
export class ComprobanteModule {}
