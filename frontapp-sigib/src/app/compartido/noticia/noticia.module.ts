import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticiaComponent } from './noticia/noticia.component';

@NgModule({
  declarations: [NoticiaComponent],
  imports: [
    CommonModule
  ],
  exports: [NoticiaComponent]
})
export class NoticiaModule { }
