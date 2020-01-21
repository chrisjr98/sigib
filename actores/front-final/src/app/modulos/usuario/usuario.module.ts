import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { UsuarioFormularioComponent } from './componentes/usuario-formulario/usuario-formulario.component';
import { UsuarioListarComponent } from './rutas/usuario-listar/usuario-listar.component';
import { UsuarioCrearComponent } from './rutas/usuario-crear/usuario-crear.component';
import { UsuarioEditarComponent } from './rutas/usuario-editar/usuario-editar.component';
import { UsuarioDetalleComponent } from './rutas/usuario-detalle/usuario-detalle.component';
import { UsuarioPerfilComponent } from './rutas/usuario-perfil/usuario-perfil.component';
import { HttpClientModule } from '@angular/common/http';
import { DataViewModule } from 'primeng/dataview';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { UsuarioResumidoComponent } from './componentes/usuario-resumido/usuario-resumido.component';
import { MyOwnCustomMaterialModule } from '../material/material.module';
import { SubirArchivoComponent } from '../material/subir-archivo/subir-archivo.component';

@NgModule({
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    HttpClientModule,
    DataViewModule,
    FormsModule,
    ReactiveFormsModule,
    MyOwnCustomMaterialModule,
  ],
  declarations: [
    UsuarioFormularioComponent,
    UsuarioListarComponent,
    UsuarioCrearComponent,
    UsuarioEditarComponent,
    UsuarioDetalleComponent,
    UsuarioPerfilComponent,
    UsuarioResumidoComponent,
  ],
  providers: [
    UsuarioService,
  ],
  entryComponents: [
    SubirArchivoComponent
  ]
})
export class UsuarioModule { }
