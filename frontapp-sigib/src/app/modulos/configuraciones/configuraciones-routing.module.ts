import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaGestionUsuariosComponent} from './rutas/ruta-gestion-usuarios/ruta-gestion-usuarios.component';
import {MenuAjustesComponent} from '../../componentes/menu-ajustes/menu-ajustes/menu-ajustes.component';

const routes: Routes = [
  {
    path: 'menu-ajustes',
    children: [
      {
        path: '',
        component: MenuAjustesComponent,
      },
      {
        path: 'usuarios',
        component: RutaGestionUsuariosComponent
      },
      {
        path: 'nivel',
        component: RutaGestionUsuariosComponent
      },
      {
        path: 'renta-fija',
        component: RutaGestionUsuariosComponent
      },
      {
        path: 'rango-valores',
        component: RutaGestionUsuariosComponent
      },
      {
        path: 'emisores',
        children: [
          {
            path: '',
            component: RutaGestionUsuariosComponent
          },
          {
            path: ':id/usuarios',
            component: RutaGestionUsuariosComponent
          },
          {
            path: ':idEmisor/papeles-renta-fija',
            component: RutaGestionUsuariosComponent
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
