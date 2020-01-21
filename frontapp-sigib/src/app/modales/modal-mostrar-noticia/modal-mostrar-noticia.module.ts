import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalMostrarNoticiaComponent } from './modal-mostrar-noticia/modal-mostrar-noticia.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MostrarNoticiasModule} from '../../componentes/mostrar-noticias/mostrar-noticias.module';



@NgModule({
  declarations: [ModalMostrarNoticiaComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MostrarNoticiasModule,
  ],
  exports: [
    ModalMostrarNoticiaComponent,
  ]
})
export class ModalMostrarNoticiaModule { }
