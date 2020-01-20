import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'ml-modal-confirmacion',
  templateUrl: './modal-confirmacion.component.html',
  styleUrls: ['./modal-confirmacion.component.css'],
})
export class ModalConfirmacionComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ModalConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      mensaje: string;
      titulo: string;
      nombreBotonTrue: string;
      nombreBotonFalse: string;
    },
  ) {}

  ngOnInit() {
    const existeTitulo = this.data.titulo;
    const existeBotonTrue = this.data.nombreBotonTrue;
    const existeBotonFalse = this.data.nombreBotonFalse;
    this.data.titulo = existeTitulo ? this.data.titulo : 'CONFIRMACIÓN';
    this.data.nombreBotonTrue = existeBotonTrue
      ? this.data.nombreBotonTrue
      : 'Aceptar';
    this.data.nombreBotonFalse = existeBotonFalse
      ? this.data.nombreBotonFalse
      : 'Cancelar';
  }

  emitirRespuestaModalConfirmacion(respuesta: boolean): void {
    this.dialogRef.close(respuesta);
  }
}
