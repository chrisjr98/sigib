import { Route, RouterModule } from '@angular/router';
import { ProductoraCrearComponent } from './rutas/productora-crear/productora-crear.component';
import { ProductoraListarComponent } from './rutas/productora-listar/productora-listar.component';
import { ProductoraEditarComponent } from './rutas/productora-editar/productora-editar.component';
import { ProductoraDetalleComponent } from './rutas/productora-detalle/productora-detalle.component';
import { NgModule } from '@angular/core';

const RUTAS: Route[] = [
    {
      path: 'crear',
      component: ProductoraCrearComponent,
    },
    {
      path: 'listar',
      component: ProductoraListarComponent,
    },
    {
      path: 'editar/:id',
      component: ProductoraEditarComponent,
    },
    {
      path: 'detalle/:id',
      component: ProductoraDetalleComponent,
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
   imports: [RouterModule.forChild(RUTAS)],
    exports: [RouterModule]
  })
  export class RoutesEmpresaModule {}
