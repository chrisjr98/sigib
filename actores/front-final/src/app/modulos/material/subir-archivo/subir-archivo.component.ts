import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';

export interface DialogData {
  url: string;
}

@Component({
  selector: 'app-subir-archivo',
  templateUrl: './subir-archivo.component.html',
  styleUrls: ['./subir-archivo.component.css']
})
export class SubirArchivoComponent {

  file: any;

  editado = false;

  constructor(
    public dialogRef: MatDialogRef<SubirArchivoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close({editado: false});
  }

  cambiarImagen() {
    this.dialogRef.close({editado: true});
  }
}
