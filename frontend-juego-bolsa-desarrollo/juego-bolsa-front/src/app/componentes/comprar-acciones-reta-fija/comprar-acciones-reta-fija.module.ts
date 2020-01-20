import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComprarAccionesRetaFijaComponent} from './comprar-acciones-reta-fija/comprar-acciones-reta-fija.component';
import {
  IngresoCantidadAccionesRentaFijaModule
} from '../../compartido/ingreso-cantidad-acciones-renta-fija/ingreso-cantidad-acciones-renta-fija.module';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {TableModule} from 'primeng/table';
import {BlockUIModule} from 'primeng/blockui';
import {MatInputModule} from '@angular/material';
import {TextMaskModule} from 'angular2-text-mask';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ComprarAccionesRetaFijaComponent],
  imports: [
    CommonModule,
    IngresoCantidadAccionesRentaFijaModule,
    VirtualScrollerModule,
    TableModule,
    BlockUIModule,
    MatInputModule,
    TextMaskModule,
    FormsModule,
  ],
  exports: [
    ComprarAccionesRetaFijaComponent
  ]
})
export class ComprarAccionesRetaFijaModule {
}
