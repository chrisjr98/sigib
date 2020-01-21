import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActorRoutingModule } from './actor-routing.module';
import { FormularioActorComponent } from './componentes/formulario-actor/formulario-actor.component';
import { ActorListarComponent } from './rutas/actor-listar/actor-listar.component';
import { ActorCrearComponent } from './rutas/actor-crear/actor-crear.component';
import { ActorEditarComponent } from './rutas/actor-editar/actor-editar.component';
import { ActorDetalleComponent } from './rutas/actor-detalle/actor-detalle.component';
import { HttpClientModule } from '@angular/common/http';
import { ActorService } from 'src/app/servicios/actor.service';
import { PeliculaService } from 'src/app/servicios/pelicula.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ActorRoutingModule,
    TableModule,
  ],
  declarations: [
    FormularioActorComponent,
    ActorListarComponent,
    ActorCrearComponent,
    ActorEditarComponent,
    ActorDetalleComponent,
  ],
  providers: [
    ActorService,
  ]
})
export class ActorModule { }
