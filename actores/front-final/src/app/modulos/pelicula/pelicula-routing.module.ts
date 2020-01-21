import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeliculaCrearComponent } from './rutas/pelicula-crear/pelicula-crear.component';
import { PeliculaListarComponent } from './rutas/pelicula-listar/pelicula-listar.component';
import { PeliculaEditarComponent } from './rutas/pelicula-editar/pelicula-editar.component';
import { PeliculaDetalleComponent } from './rutas/pelicula-detalle/pelicula-detalle.component';

const routes: Routes = [
  {
    path: 'crear',
    component: PeliculaCrearComponent,
  },
  {
    path: 'listar',
    component: PeliculaListarComponent,
  },
  {
    path: 'editar/:id',
    component: PeliculaEditarComponent,
  },
  {
    path: 'detalle/:id',
    component: PeliculaDetalleComponent,
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
export class PeliculaRoutingModule { }
