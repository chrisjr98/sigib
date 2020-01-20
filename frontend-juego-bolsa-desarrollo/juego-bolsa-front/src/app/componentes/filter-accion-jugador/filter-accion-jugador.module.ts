import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterAccionJugadorComponent } from './filter-accion-jugador/filter-accion-jugador.component';
import {AccionJugadorModule} from '../../compartido/accion-jugador/accion-jugador.module';
import {BarraBusquedaModule} from '../../compartido/barra-busqueda/barra-busqueda.module';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule} from '@angular/forms';
import { TableModule } from 'primeng/table';



@NgModule({
  declarations: [FilterAccionJugadorComponent],
  imports: [
    CommonModule,
    AccionJugadorModule,
    BarraBusquedaModule,
    ScrollPanelModule,
    DropdownModule,
    FormsModule,
    TableModule,
  ],
  exports: [FilterAccionJugadorComponent]
})
export class FilterAccionJugadorModule { }
