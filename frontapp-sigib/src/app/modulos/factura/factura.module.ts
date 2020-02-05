import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { RutaGestionFacturaComponent } from './rutas/ruta-gestion-factura/ruta-gestion-factura.component';
import { MenuOpcionesFacturacionModule } from 'src/app/componentes/menu-opciones-facturacion/menu-opciones-facturacion.module';
import { RutaGestionComprobanteComponent } from './rutas/ruta-gestion-comprobante/ruta-gestion-comprobante.component';


@NgModule({
  declarations: [RutaGestionFacturaComponent, RutaGestionComprobanteComponent],
  imports: [
    CommonModule,
    FacturaRoutingModule,
    MenuOpcionesFacturacionModule
  ]
})
export class FacturaModule { }
