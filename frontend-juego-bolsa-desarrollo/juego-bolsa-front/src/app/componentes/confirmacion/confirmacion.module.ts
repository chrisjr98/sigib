import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule } from '@angular/material';
import { ModalConfirmacionComponent } from './modal/modal-confirmacion/modal-confirmacion.component';

@NgModule({
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  declarations: [ModalConfirmacionComponent],
  entryComponents: [ModalConfirmacionComponent],
  exports: [ModalConfirmacionComponent],
})
export class ConfirmacionModule {}
