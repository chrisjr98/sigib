import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraBusquedaComponent } from './barra-busqueda/barra-busqueda.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [BarraBusquedaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BarraBusquedaComponent
  ]
})
export class BarraBusquedaModule { }
