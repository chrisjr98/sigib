import {MatButtonModule, MatCheckboxModule, MatMenu, MatMenuModule, MatCardModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {FileUploadModule} from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { SubirArchivoComponent } from './subir-archivo/subir-archivo.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    FileUploadModule,
    CommonModule,
    ConfirmDialogModule,
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatDialogModule,
    FileUploadModule,
    SubirArchivoComponent,
    ConfirmDialogModule,
  ],
  declarations: [
    SubirArchivoComponent
  ]
})
export class MyOwnCustomMaterialModule { }
