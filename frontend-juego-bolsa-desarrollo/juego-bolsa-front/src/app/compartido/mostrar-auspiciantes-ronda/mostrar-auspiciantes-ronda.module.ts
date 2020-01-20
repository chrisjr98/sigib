import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarAuspiciantesRondaComponent } from './mostrar-auspiciantes-ronda/mostrar-auspiciantes-ronda.component';
import {CardModule} from 'primeng/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [MostrarAuspiciantesRondaComponent],
  imports: [
    CommonModule,
    CardModule,
    MatGridListModule,
  ],
  exports: [
    MostrarAuspiciantesRondaComponent,
  ]
})
export class MostrarAuspiciantesRondaModule { }
