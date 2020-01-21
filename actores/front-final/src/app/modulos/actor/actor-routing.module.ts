import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActorCrearComponent } from './rutas/actor-crear/actor-crear.component';
import { ActorListarComponent } from './rutas/actor-listar/actor-listar.component';
import { ActorEditarComponent } from './rutas/actor-editar/actor-editar.component';
import { ActorDetalleComponent } from './rutas/actor-detalle/actor-detalle.component';

const routes: Routes = [
  {
    path: 'crear/:idPelicula',
    component: ActorCrearComponent,
  },
  {
    path: 'listar/:idPelicula',
    component: ActorListarComponent,
  },
  {
    path: 'editar/:id/:idPelicula',
    component: ActorEditarComponent,
  },
  {
    path: 'detalle/:id/:idPelicula',
    component: ActorDetalleComponent,
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  },
  {
      path: '**',
      redirectTo: 'listar',
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActorRoutingModule { }
