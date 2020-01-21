import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegistrarJugadasComponent} from './registrar-jugadas/registrar-jugadas.component';
import {TableModule} from 'primeng/table';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {PickListModule} from 'primeng/primeng';
// tslint:disable-next-line:max-line-length
import {ComprarAccionesRetaFijaModule} from '../../componentes/comprar-acciones-reta-fija/comprar-acciones-reta-fija.module';
// tslint:disable-next-line:max-line-length
import {IngresoCantidadAccionesRentaFijaModule} from '../../compartido/ingreso-cantidad-acciones-renta-fija/ingreso-cantidad-acciones-renta-fija.module';
// tslint:disable-next-line:max-line-length
import {IngresoCantidadAccionesRentaFijaComponent} from '../../compartido/ingreso-cantidad-acciones-renta-fija/ingreso-cantidad-acciones-renta-fija/ingreso-cantidad-acciones-renta-fija.component';
import {ListboxParticipantesModule} from '../../compartido/listbox-participantes/listbox-participantes.module';
import {ListboxParticipantesComponent} from '../../compartido/listbox-participantes/listbox-participantes/listbox-participantes.component';
// tslint:disable-next-line:max-line-length
import {ComprarAccionesRetaFijaComponent} from '../../componentes/comprar-acciones-reta-fija/comprar-acciones-reta-fija/comprar-acciones-reta-fija.component';
import {VirtualScrollerModule} from 'primeng/virtualscroller';

@NgModule({
  declarations: [RegistrarJugadasComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    ComprarAccionesRetaFijaModule,
    IngresoCantidadAccionesRentaFijaModule,
    ListboxParticipantesModule,
    VirtualScrollerModule,
  ],
  exports: [RegistrarJugadasComponent],
  entryComponents: [
    RegistrarJugadasComponent,
    ComprarAccionesRetaFijaComponent,
    IngresoCantidadAccionesRentaFijaComponent,
    ListboxParticipantesComponent

  ]

})
export class RegistrarJugadasModule {
}
