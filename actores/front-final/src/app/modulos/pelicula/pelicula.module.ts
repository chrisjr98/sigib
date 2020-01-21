import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeliculaRoutingModule } from './pelicula-routing.module';
import { PeliculaResumidaComponent } from './componentes/pelicula-resumida/pelicula-resumida.component';
import { PeliculaFormularioComponent } from './componentes/pelicula-formulario/pelicula-formulario.component';
import { PeliculaListarComponent } from './rutas/pelicula-listar/pelicula-listar.component';
import { PeliculaCrearComponent } from './rutas/pelicula-crear/pelicula-crear.component';
import { PeliculaEditarComponent } from './rutas/pelicula-editar/pelicula-editar.component';
import { PeliculaDetalleComponent } from './rutas/pelicula-detalle/pelicula-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeliculaService } from 'src/app/servicios/pelicula.service';
import {TableModule} from 'primeng/table';
import { ProductoraService } from 'src/app/servicios/productora.service';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from '../graphql/graphql.module';
import {RatingModule} from 'primeng/rating';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PeliculaRoutingModule,
    TableModule,
    HttpClientModule,
    GraphQLModule,
    RatingModule,
  ],
  declarations: [
    PeliculaResumidaComponent,
    PeliculaFormularioComponent,
    PeliculaListarComponent,
    PeliculaCrearComponent,
    PeliculaEditarComponent,
    PeliculaDetalleComponent,
  ],
  providers: [
    PeliculaService,
    ProductoraService,
  ]
})
export class PeliculaModule { }
