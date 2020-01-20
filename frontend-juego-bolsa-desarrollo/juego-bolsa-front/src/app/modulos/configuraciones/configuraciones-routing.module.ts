import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaGestionNoticiasComponent} from './rutas/ruta-gestion-noticias/ruta-gestion-noticias.component';
import {RutaGestionRentaFijaComponent} from './rutas/ruta-gestion-renta-fija/ruta-gestion-renta-fija.component';
import {RutaGestionEmisoresComponent} from './rutas/ruta-gestion-emisores/ruta-gestion-emisores.component';
import {RutaGestionNoticiasEmisorComponent} from './rutas/ruta-gestion-noticias-emisor/ruta-gestion-noticias-emisor.component';
import {RutaRangoValoresComponent} from './rutas/ruta-rango-valores/ruta-rango-valores.component';
import {RutaGestionNivelComponent} from './rutas/ruta-gestion-nivel/ruta-gestion-nivel.component';
import {MenuAjustesComponent} from '../../componentes/menu-ajustes/menu-ajustes/menu-ajustes.component';
import {RutaGestionRentaFijaEmisorComponent} from './rutas/ruta-gestion-renta-fija-emisor/ruta-gestion-renta-fija-emisor.component';

const routes: Routes = [
  {
    path: 'menu-ajustes',
    children: [
      {
        path: '',
        component: MenuAjustesComponent,
      },
      {
        path: 'noticias',
        component: RutaGestionNoticiasComponent
      },
      {
        path: 'nivel',
        component: RutaGestionNivelComponent
      },
      {
        path: 'renta-fija',
        component: RutaGestionRentaFijaComponent
      },
      {
        path: 'rango-valores',
        component: RutaRangoValoresComponent
      },
      {
        path: 'emisores',
        children: [
          {
            path: '',
            component: RutaGestionEmisoresComponent
          },
          {
            path: ':id/noticias',
            component: RutaGestionNoticiasEmisorComponent
          },
          {
            path: ':idEmisor/papeles-renta-fija',
            component: RutaGestionRentaFijaEmisorComponent
          }
        ]
      },
    ]
  },
  {
    path: '',
    redirectTo: 'menu-ajustes',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ConfiguracionesRoutingModule {
}
