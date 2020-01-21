import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioCrearComponent } from './rutas/usuario-crear/usuario-crear.component';
import { UsuarioListarComponent } from './rutas/usuario-listar/usuario-listar.component';
import { UsuarioEditarComponent } from './rutas/usuario-editar/usuario-editar.component';
import { UsuarioDetalleComponent } from './rutas/usuario-detalle/usuario-detalle.component';
import { UsuarioPerfilComponent } from './rutas/usuario-perfil/usuario-perfil.component';

const routes: Routes = [
  {
    path: 'crear',
    component: UsuarioCrearComponent,
  },
  {
    path: 'listar',
    component: UsuarioListarComponent,
  },
  {
    path: 'editar/:id',
    component: UsuarioEditarComponent,
  },
  {
    path: 'detalle/:id',
    component: UsuarioDetalleComponent,
  },
  {
    path: 'perfil/:id',
    component: UsuarioPerfilComponent,
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
export class UsuarioRoutingModule { }
