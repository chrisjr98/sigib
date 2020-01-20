import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaJuegosComponent } from './lista-juegos/lista-juegos.component';
import {JuegoModule} from '../../compartido/juego/juego.module';
import {LocalStorageService} from '../../servicios/rest/servicios/local-storage.service';

@NgModule({
  declarations: [ListaJuegosComponent],
  imports: [
    CommonModule,
    JuegoModule
  ],
  exports: [ListaJuegosComponent],
  providers: [LocalStorageService]
})
export class ListaJuegosModule { }
