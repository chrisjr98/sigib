import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GalleriaModule} from 'primeng/galleria';
import {TablaJugadasComponent} from './tabla-jugadas/tabla-jugadas.component';
import {TableModule} from 'primeng/table';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [TablaJugadasComponent],
  imports: [
    CommonModule,
    GalleriaModule,
    TableModule,
    MatDialogModule,
  ],
  exports: [
    TablaJugadasComponent,
  ]
})
export class TablaJugadasModule { }
