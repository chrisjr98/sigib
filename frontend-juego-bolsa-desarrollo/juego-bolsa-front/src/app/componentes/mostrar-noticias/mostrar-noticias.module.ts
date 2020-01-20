import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MostrarNoticiasComponent } from './mostrar-noticias/mostrar-noticias.component';
import {NoticiaModule} from '../../compartido/noticia/noticia.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [MostrarNoticiasComponent],
  imports: [
    CommonModule,
    NoticiaModule,
    FormsModule,
  ],
  exports: [MostrarNoticiasComponent]
})
export class MostrarNoticiasModule { }
