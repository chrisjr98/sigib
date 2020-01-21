import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListarJugadoresComponent} from './listar-jugadores/listar-jugadores.component';

@NgModule({
  declarations: [ListarJugadoresComponent],
  imports: [
    CommonModule
  ],
  exports: [ListarJugadoresComponent]
})
export class ListarJugadoresModule { }
