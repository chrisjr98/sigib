import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuOpcionesFacturacionComponent } from 'src/app/componentes/menu-opciones-facturacion/menu-opciones-facturacion/menu-opciones-facturacion.component';
import { RutaGestionFacturaComponent } from './rutas/ruta-gestion-factura/ruta-gestion-factura.component';
import { RutaGestionComprobanteComponent } from './rutas/ruta-gestion-comprobante/ruta-gestion-comprobante.component';
import { RegistroComprobanteComponent } from './componentes/registro-comprobante/registro-comprobante/registro-comprobante.component';


const routes: Routes = [
    {
    path: 'menu-factura',
    children: [
      {
        path: '',
        component: MenuOpcionesFacturacionComponent,
      },
      {
        path: 'factura',
        component:RutaGestionFacturaComponent
      },
      {
        path: 'comprobante',
                children: [
          {
            path: '',
            component: RutaGestionComprobanteComponent
          },
          {
            path: 'nuevo-comprobante',
            component: RegistroComprobanteComponent
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: 'menu-factura',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturaRoutingModule { }
