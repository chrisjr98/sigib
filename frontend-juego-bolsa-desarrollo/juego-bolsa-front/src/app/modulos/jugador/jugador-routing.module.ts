import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaListarJuegosComponent} from './rutas/ruta-listar-juegos/ruta-listar-juegos.component';
import {RutaIngresarJuegoComponent} from './rutas/ruta-ingresar-juego/ruta-ingresar-juego.component';
import {RutaJuegoSeleccionadoComponent} from './rutas/ruta-juego-seleccionado/ruta-juego-seleccionado.component';
import {MostrarAuspiciantesComponent} from '../../compartido/mostrar-auspiciantes/mostrar-auspiciantes/mostrar-auspiciantes.component';
import {JugadorGuard} from '../../servicios/guard/jugador.guard';
import {AdministradorGuard} from '../../servicios/guard/administrador.guard';

const routes: Routes = [
  {
    path: 'listar-juegos',
    component: RutaListarJuegosComponent,
    // canActivate: [AdministradorGuard]
  },
  {
    path: 'ingresar-juego/:idJuego',
    component: RutaIngresarJuegoComponent
  },
  {
    path: 'juego-seleccionado/:idJuego',
    component: RutaJuegoSeleccionadoComponent,
  },
  {
    path: 'listar-auspiciantes',
    component: MostrarAuspiciantesComponent
  },
  {
    path: '',
    redirectTo: 'listar-juegos',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JugadorRoutingModule {
}
