import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RankingJugadoresComponent } from './ranking-jugadores/ranking-jugadores.component';
import {GalleriaModule} from 'primeng/galleria';
import {CarouselModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {ModalConfirmacionComponent} from '../../componentes/confirmacion/modal/modal-confirmacion/modal-confirmacion.component';
import {MatDialogModule} from '@angular/material';


@NgModule({
  declarations: [RankingJugadoresComponent],
  imports: [
    CommonModule,
    GalleriaModule,
    CarouselModule,
    TableModule,
    MatDialogModule,
  ],
  exports: [
    RankingJugadoresComponent,
  ]
})
export class RankingJugadoresModule { }
