import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarAuspiciantesComponent } from './mostrar-auspiciantes/mostrar-auspiciantes.component';
import {CardModule} from 'primeng/card';
import {MatGridListModule} from '@angular/material/grid-list';



@NgModule({
  declarations: [MostrarAuspiciantesComponent],
  imports: [
    CommonModule,
    CardModule,
    MatGridListModule
  ],
  exports: [
    MostrarAuspiciantesComponent,
  ]
})
export class MostrarAuspiciantesModule { }
