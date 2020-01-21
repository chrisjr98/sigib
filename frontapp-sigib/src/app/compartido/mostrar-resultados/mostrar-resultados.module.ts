import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarResultadosComponent } from './mostrar-resultados/mostrar-resultados.component';
import {CarouselModule} from 'primeng/carousel';



@NgModule({
  declarations: [MostrarResultadosComponent],
  imports: [
    CommonModule,
    CarouselModule

  ],
  exports: [ MostrarResultadosComponent ]
})
export class MostrarResultadosModule { }
