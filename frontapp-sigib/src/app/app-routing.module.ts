import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RutaInicioComponent} from './rutas/ruta-inicio/ruta-inicio.component';
import {RutaNoEncontradaComponent} from './rutas/ruta-no-encontrada/ruta-no-encontrada.component';
import {RUTAS_JUGADOR} from './constantes/rutas-jugador';
import {RUTAS_ADMINISTRADOR} from './constantes/rutas-administrador';
import {RUTAS_CONFIGURACIONES} from './constantes/rutas-noticias';
import {RutaGestionNivelComponent} from './modulos/configuraciones/rutas/ruta-gestion-nivel/ruta-gestion-nivel.component';
import {
  RutaGestionRentaFijaComponent
} from './modulos/configuraciones/rutas/ruta-gestion-renta-fija/ruta-gestion-renta-fija.component';
import {RutaRangoValoresComponent} from './modulos/configuraciones/rutas/ruta-rango-valores/ruta-rango-valores.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: RutaInicioComponent,
  },
  ...RUTAS_JUGADOR,
  ...RUTAS_ADMINISTRADOR,
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: RutaNoEncontradaComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
