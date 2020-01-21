import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccionesEmisorRondaComponent } from './acciones-emisor-ronda/acciones-emisor-ronda.component';
import {AccionEmisorModule} from '../../compartido/accion-emisor/accion-emisor.module';
import {ScrollPanelModule} from 'primeng/scrollpanel';

@NgModule({
  declarations: [AccionesEmisorRondaComponent],
  imports: [
    CommonModule,
    AccionEmisorModule,
    ScrollPanelModule
  ],
  exports: [AccionesEmisorRondaComponent]
})
export class AccionesEmisorRondaModule { }
