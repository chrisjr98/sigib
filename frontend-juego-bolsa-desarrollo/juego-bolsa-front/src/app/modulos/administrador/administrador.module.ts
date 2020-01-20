import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RutaLoginAdministradorComponent} from './rutas/ruta-login-administrador/ruta-login-administrador.component';
import {RutaMenuAdministradorComponent} from './rutas/ruta-menu-administrador/ruta-menu-administrador.component';
import {RutaListarJuegosComponent} from './rutas/ruta-listar-juegos/ruta-listar-juegos.component';
import {RutaCrearJuegoComponent} from './rutas/ruta-crear-juego/ruta-crear-juego.component';
import {RutaJuegoSeleccionadoComponent} from './rutas/ruta-juego-seleccionado/ruta-juego-seleccionado.component';
import {AdministradorRoutingModule} from './administrador-routing.module';
import {ListaJuegosModule} from '../../componentes/lista-juegos/lista-juegos.module';
import {BarraBusquedaModule} from '../../compartido/barra-busqueda/barra-busqueda.module';
import {MenuOpcionesAdministradorModule} from '../../componentes/menu-opciones-administrador/menu-opciones-administrador.module';
import {JuegoAdministradorJugadorModule} from '../../compartido/juego-administrador-jugador/juego-administrador-jugador.module';
import {JuegoFormularioComponent} from '../../formularios/juego-formulario/juego-formulario.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatInputModule} from '@angular/material';
import {MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {ListarJugadoresModule} from '../../componentes/listar-jugadores/listar-jugadores.module';
import {MostrarAuspiciantesModule} from '../../compartido/mostrar-auspiciantes/mostrar-auspiciantes.module';
import { RutaListarParticipantesComponent } from './rutas/ruta-listar-participantes/ruta-listar-participantes.component';
import {MenuAjustesModule} from '../../componentes/menu-ajustes/menu-ajustes.module';
import {SeleccionarEmisoresModule} from '../../modales/seleccionar-emisores/seleccionar-emisores.module';
import {ConfiguracionesModule} from '../configuraciones/configuraciones.module';

@NgModule({
  declarations: [
    RutaLoginAdministradorComponent,
    RutaMenuAdministradorComponent,
    RutaListarJuegosComponent,
    RutaCrearJuegoComponent,
    RutaJuegoSeleccionadoComponent,
    JuegoFormularioComponent,
    RutaListarParticipantesComponent
  ],
  imports: [
    CommonModule,
    AdministradorRoutingModule,
    ListaJuegosModule,
    BarraBusquedaModule,
    MenuOpcionesAdministradorModule,
    JuegoAdministradorJugadorModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    ListarJugadoresModule,
    MostrarAuspiciantesModule,
    MenuAjustesModule,
    ConfiguracionesModule,
    SeleccionarEmisoresModule
  ],
  entryComponents: []
})
export class AdministradorModule {
}
