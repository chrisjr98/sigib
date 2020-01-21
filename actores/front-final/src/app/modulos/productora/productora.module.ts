import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoraListarComponent } from './rutas/productora-listar/productora-listar.component';
import { ProductoraCrearComponent } from './rutas/productora-crear/productora-crear.component';
import { ProductoraEditarComponent } from './rutas/productora-editar/productora-editar.component';
import { ProductoraDetalleComponent } from './rutas/productora-detalle/productora-detalle.component';
import { ProductoraResumidoComponent } from './componentes/productora-resumido/productora-resumido.component';
import { ProductoraService } from 'src/app/servicios/productora.service';
import { GraphQLModule } from '../graphql/graphql.module';
import { RoutesEmpresaModule } from './productora-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductoraFormularioComponent } from './componentes/productora-formulario/productora-formulario.component';
import { DataViewModule } from 'primeng/dataview';
import { MyOwnCustomMaterialModule } from '../material/material.module';
import { SubirArchivoComponent } from '../material/subir-archivo/subir-archivo.component';
import {DropdownModule} from 'primeng/dropdown';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  imports: [
    CommonModule,
    GraphQLModule,
    RoutesEmpresaModule,
    FormsModule,
    ReactiveFormsModule,
    DataViewModule,
    MyOwnCustomMaterialModule,
    DropdownModule,
  ],
  declarations: [
    ProductoraListarComponent,
    ProductoraCrearComponent,
    ProductoraEditarComponent,
    ProductoraDetalleComponent,
    ProductoraResumidoComponent,
    ProductoraFormularioComponent,
  ],
  providers: [
    ProductoraService,
    ConfirmationService,
  ],
  entryComponents: [
    SubirArchivoComponent
  ]
})
export class ProductoraModule { }
