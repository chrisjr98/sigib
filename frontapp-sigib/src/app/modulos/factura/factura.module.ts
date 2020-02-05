import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { RutaGestionFacturaComponent } from './rutas/ruta-gestion-factura/ruta-gestion-factura.component';
import { MenuOpcionesFacturacionModule } from 'src/app/componentes/menu-opciones-facturacion/menu-opciones-facturacion.module';
import { RutaGestionComprobanteComponent } from './rutas/ruta-gestion-comprobante/ruta-gestion-comprobante.component';
import { FormularioComprobanteComponent } from './formularios/formulario-comprobante/formulario-comprobante.component';
import { RegistroComprobanteComponent } from './componentes/registro-comprobante/registro-comprobante/registro-comprobante.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatDialogModule, MatSelectModule, MatOptionModule, MatButtonModule } from '@angular/material';
import { TextMaskModule } from 'angular2-text-mask';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { SelectGeneralModule } from 'src/app/compartido/select-general/select-general.module';
import { PickListModule } from 'primeng/picklist';


@NgModule({
  declarations: [RutaGestionFacturaComponent,
    RutaGestionComprobanteComponent,
    FormularioComprobanteComponent,
    RegistroComprobanteComponent],
  imports: [
    CommonModule,
    FacturaRoutingModule,
    MenuOpcionesFacturacionModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    TextMaskModule,
    DropdownModule,
    MatDialogModule,
    TableModule,
    MatSelectModule,
    SelectGeneralModule,
    MatOptionModule,
    PickListModule,
    MatButtonModule,
  ]
})
export class FacturaModule { }
