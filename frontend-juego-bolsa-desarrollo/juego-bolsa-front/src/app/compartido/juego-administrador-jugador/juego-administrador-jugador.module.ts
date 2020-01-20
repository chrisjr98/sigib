import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {JuegoAdministradorJugadorComponent} from './juego-administrador-jugador/juego-administrador-jugador.component';
import {AccionesEmisorRondaModule} from '../../componentes/acciones-emisor-ronda/acciones-emisor-ronda.module';
import {MostrarAuspiciantesRondaModule} from '../mostrar-auspiciantes-ronda/mostrar-auspiciantes-ronda.module';
import {GraficoAccionesModule} from '../grafico-acciones/grafico-acciones.module';
import {MostrarNoticiasModule} from '../../componentes/mostrar-noticias/mostrar-noticias.module';
import {FilterAccionJugadorModule} from '../../componentes/filter-accion-jugador/filter-accion-jugador.module';
import {IngresoCantidadAccionesRentaFijaModule} from '../ingreso-cantidad-acciones-renta-fija/ingreso-cantidad-acciones-renta-fija.module';
import {OpcionesRondaModule} from '../../modales/opciones-ronda/opciones-ronda.module';
import {OpcionesRondaComponent} from '../../modales/opciones-ronda/opciones-ronda/opciones-ronda.component';
import {DialogModule} from 'primeng/dialog';
import {ComprarAccionesRetaFijaModule} from '../../componentes/comprar-acciones-reta-fija/comprar-acciones-reta-fija.module';
import {RankingJugadoresComponent} from '../ranking-jugadores/ranking-jugadores/ranking-jugadores.component';
import {RankingJugadoresModule} from '../ranking-jugadores/ranking-jugadores.module';
import { CountdownModule } from 'ngx-countdown';
import {TablaJugadasComponent} from '../tabla-jugadas/tabla-jugadas/tabla-jugadas.component';
import {TablaJugadasModule} from '../tabla-jugadas/tabla-jugadas.module';
import {ModalMostrarNoticiaModule} from '../../modales/modal-mostrar-noticia/modal-mostrar-noticia.module';
import {ModalMostrarNoticiaComponent} from '../../modales/modal-mostrar-noticia/modal-mostrar-noticia/modal-mostrar-noticia.component';
import {ModalConfirmacionComponent} from '../../componentes/confirmacion/modal/modal-confirmacion/modal-confirmacion.component';
import {ConfirmacionModule} from '../../componentes/confirmacion/confirmacion.module';

@NgModule({
  declarations: [
    JuegoAdministradorJugadorComponent
  ],
  imports: [
    CommonModule,
    AccionesEmisorRondaModule,
    MostrarAuspiciantesRondaModule,
    GraficoAccionesModule,
    MostrarNoticiasModule,
    FilterAccionJugadorModule,
    IngresoCantidadAccionesRentaFijaModule,
    OpcionesRondaModule,
    DialogModule,
    ComprarAccionesRetaFijaModule,
    RankingJugadoresModule,
    CountdownModule,
    TablaJugadasModule,
    ModalMostrarNoticiaModule,
    ConfirmacionModule,
  ],
  exports: [
    JuegoAdministradorJugadorComponent,
  ],
  entryComponents: [
    OpcionesRondaComponent,
    RankingJugadoresComponent,
    TablaJugadasComponent,
    ModalMostrarNoticiaComponent,
    ModalConfirmacionComponent,
  ]
})
export class JuegoAdministradorJugadorModule { }
