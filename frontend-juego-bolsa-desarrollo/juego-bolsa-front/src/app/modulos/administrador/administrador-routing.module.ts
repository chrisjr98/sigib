import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaLoginAdministradorComponent} from './rutas/ruta-login-administrador/ruta-login-administrador.component';
import {RutaMenuAdministradorComponent} from './rutas/ruta-menu-administrador/ruta-menu-administrador.component';
import {RutaListarJuegosComponent} from './rutas/ruta-listar-juegos/ruta-listar-juegos.component';
import {RutaJuegoSeleccionadoComponent} from './rutas/ruta-juego-seleccionado/ruta-juego-seleccionado.component';
import {RutaCrearJuegoComponent} from './rutas/ruta-crear-juego/ruta-crear-juego.component';
import {MostrarAuspiciantesComponent} from '../../compartido/mostrar-auspiciantes/mostrar-auspiciantes/mostrar-auspiciantes.component';
import {
  JuegoAdministradorJugadorComponent
} from '../../compartido/juego-administrador-jugador/juego-administrador-jugador/juego-administrador-jugador.component';
import {RutaListarParticipantesComponent} from './rutas/ruta-listar-participantes/ruta-listar-participantes.component';
import {MenuAjustesComponent} from '../../componentes/menu-ajustes/menu-ajustes/menu-ajustes.component';

const routes: Routes = [
  {
    path: 'login',
    component: RutaLoginAdministradorComponent
  },
  {
    path: 'menu',
    children: [
      {
        path: '',
        component: RutaMenuAdministradorComponent
      },
      {
        path: 'configuraciones',
        loadChildren: () => import('../configuraciones/configuraciones.module').then(mod => mod.ConfiguracionesModule),
      }
    ]
  },
  {
    path: 'menu/juegos/listar-juegos',
    component: RutaListarJuegosComponent,
  },
  {
    path: 'menu/juegos/crear-juego',
    component: RutaCrearJuegoComponent
  },
  {
    path: 'menu/juegos/juego-seleccionado/:idJuego',
    component: RutaJuegoSeleccionadoComponent,
  },
  {
    path: 'menu/juegos/listar-jugadores/:idJuego',
    component: RutaListarParticipantesComponent,
  },
  {
    path: 'listar-auspiciantes',
    component: MostrarAuspiciantesComponent
  },
  {
    path: 'juego-administrador',
    component: JuegoAdministradorJugadorComponent
  },
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
