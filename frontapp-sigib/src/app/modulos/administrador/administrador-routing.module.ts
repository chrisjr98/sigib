import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RutaMenuAdministradorComponent} from './rutas/ruta-menu-administrador/ruta-menu-administrador.component';
import {MenuAjustesComponent} from '../../componentes/menu-ajustes/menu-ajustes/menu-ajustes.component';
import { RutaLoginComponent } from './rutas/ruta-login/ruta-login.component';

const routes: Routes = [
  {
    path: 'login',
    component: RutaLoginComponent
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
      },
      {
        path: 'academico',
        loadChildren: () => import('../academico/academico.module').then(mod => mod.AcademicoModule),
      }
    ]
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
