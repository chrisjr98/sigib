import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AccionEmisorComponent} from './accion-emisor/accion-emisor.component';

@NgModule({
  declarations: [AccionEmisorComponent],
  imports: [
    CommonModule
  ],
  exports: [AccionEmisorComponent]
})
export class AccionEmisorModule { }
