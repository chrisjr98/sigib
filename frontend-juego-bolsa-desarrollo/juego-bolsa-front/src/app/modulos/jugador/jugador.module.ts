import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RutaListarJuegosComponent } from './rutas/ruta-listar-juegos/ruta-listar-juegos.component';
import { RutaIngresarJuegoComponent } from './rutas/ruta-ingresar-juego/ruta-ingresar-juego.component';
import { RutaJuegoSeleccionadoComponent } from './rutas/ruta-juego-seleccionado/ruta-juego-seleccionado.component';
import {JugadorRoutingModule} from './jugador-routing.module';
import {JuegoModule} from '../../compartido/juego/juego.module';
import {ListaJuegosModule} from '../../componentes/lista-juegos/lista-juegos.module';
import {RegistroFormularioComponent} from '../../formularios/registro-formulario/registro-formulario.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {TextMaskModule} from 'angular2-text-mask';
import { ListaAuspiciantesComponent } from './rutas/componentes/lista-auspiciantes/lista-auspiciantes.component';
import {MostrarAuspiciantesModule} from '../../compartido/mostrar-auspiciantes/mostrar-auspiciantes.module';
import {MostrarResultadosModule} from '../../compartido/mostrar-resultados/mostrar-resultados.module';
import { ResultadoAuspiciantesComponent } from './rutas/componentes/resultado-auspiciantes/resultado-auspiciantes.component';
import {JuegoAdministradorJugadorModule} from '../../compartido/juego-administrador-jugador/juego-administrador-jugador.module';
import {ListarJugadoresModule} from '../../componentes/listar-jugadores/listar-jugadores.module';
import {LocalStorageService} from '../../servicios/rest/servicios/local-storage.service';
import {ComprarAccionesRetaFijaModule} from '../../componentes/comprar-acciones-reta-fija/comprar-acciones-reta-fija.module';
import {VirtualScrollerModule} from 'primeng/virtualscroller';

@NgModule({
  declarations: [
    RutaListarJuegosComponent,
    RutaIngresarJuegoComponent,
    RutaJuegoSeleccionadoComponent,
    RegistroFormularioComponent,
    ListaAuspiciantesComponent,
    ResultadoAuspiciantesComponent,
  ],
  imports: [
    CommonModule,
    JugadorRoutingModule,
    JuegoModule,
    ListaJuegosModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    TextMaskModule,
    MostrarAuspiciantesModule,
    MostrarResultadosModule,
    JuegoAdministradorJugadorModule,
    ListarJugadoresModule,
    ComprarAccionesRetaFijaModule,
    VirtualScrollerModule
  ],
  providers: [
    LocalStorageService,
  ]
})
export class JugadorModule { }
