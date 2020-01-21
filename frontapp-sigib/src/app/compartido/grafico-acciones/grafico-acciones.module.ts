import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GraficoAccionesComponent} from './grafico-acciones/grafico-acciones.component';
import {ChartModule} from 'primeng/chart';


@NgModule({
  declarations: [GraficoAccionesComponent],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [
    GraficoAccionesComponent
  ]
})
export class GraficoAccionesModule {
}
