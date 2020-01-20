import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SeleccionarEmisoresComponent} from './seleccionar-emisores/seleccionar-emisores.component';
import {TableModule} from 'primeng/table';
import {MatButtonModule, MatDialogModule} from '@angular/material';
import {PickListModule} from 'primeng/picklist';

@NgModule({
  declarations: [SeleccionarEmisoresComponent],
  imports: [
    CommonModule,
    TableModule,
    MatDialogModule,
    MatButtonModule,
    PickListModule,
  ],
  entryComponents: [SeleccionarEmisoresComponent],
  exports: [SeleccionarEmisoresComponent]
})
export class SeleccionarEmisoresModule {
}
