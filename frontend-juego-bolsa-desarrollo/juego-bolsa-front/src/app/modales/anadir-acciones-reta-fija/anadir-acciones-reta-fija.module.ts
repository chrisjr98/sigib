import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnadirAccionesRetaFijaComponent} from './anadir-acciones-reta-fija/anadir-acciones-reta-fija.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [AnadirAccionesRetaFijaComponent],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  exports: [
    AnadirAccionesRetaFijaComponent
  ]
})
export class AnadirAccionesRetaFijaModule {
}
