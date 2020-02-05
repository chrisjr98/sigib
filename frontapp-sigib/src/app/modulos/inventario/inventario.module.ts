import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { FormularioProductoComponent } from './formularios/formulario-producto/formulario-producto.component';
import { CrearEditarProductoComponent } from './modales/crear-editar-producto/crear-editar-producto.component';
import { RutaGestionInventarioComponent } from './rutas/ruta-gestion-inventario/ruta-gestion-inventario.component';


@NgModule({
  declarations: [FormularioProductoComponent, CrearEditarProductoComponent, RutaGestionInventarioComponent],
  imports: [
    CommonModule,
    InventarioRoutingModule
  ]
})
export class InventarioModule { }
