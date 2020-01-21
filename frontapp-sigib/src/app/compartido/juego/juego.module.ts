import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegoComponent } from './juego/juego.component';
import {CardModule} from 'primeng/card';

@NgModule({
  declarations: [JuegoComponent],
  imports: [
    CommonModule,
    CardModule,
  ],
  exports: [
    JuegoComponent
  ]
})
export class JuegoModule { }
