import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  IngresoCantidadAccionesRentaFijaComponent
} from './ingreso-cantidad-acciones-renta-fija/ingreso-cantidad-acciones-renta-fija.component';
import {AccionEmisorModule} from '../accion-emisor/accion-emisor.module';
import {InputCantidadModule} from '../input-cantidad/input-cantidad.module';
import {VirtualScrollerModule} from 'primeng/virtualscroller';

@NgModule({
  declarations: [IngresoCantidadAccionesRentaFijaComponent],
  imports: [
    CommonModule,
    AccionEmisorModule,
    InputCantidadModule,
    VirtualScrollerModule,
  ],
  exports: [
    IngresoCantidadAccionesRentaFijaComponent
  ]
})
export class IngresoCantidadAccionesRentaFijaModule {
}
