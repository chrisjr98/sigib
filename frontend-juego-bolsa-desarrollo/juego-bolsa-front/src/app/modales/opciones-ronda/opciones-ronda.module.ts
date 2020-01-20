import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OpcionesRondaComponent} from './opciones-ronda/opciones-ronda.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [OpcionesRondaComponent],
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  exports: [OpcionesRondaComponent]
})
export class OpcionesRondaModule { }
