import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccionJugadorComponent } from './accion-jugador/accion-jugador.component';



@NgModule({
  declarations: [AccionJugadorComponent],
  exports: [
    AccionJugadorComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccionJugadorModule { }
