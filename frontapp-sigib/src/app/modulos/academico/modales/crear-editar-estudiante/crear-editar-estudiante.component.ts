import { Component, OnInit, Inject } from '@angular/core';
import { EstudianteInterface } from 'src/app/interfaces/interfaces/estudiante.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RutaGestionEstudiantesComponent } from '../../rutas/ruta-gestion-estudiantes/ruta-gestion-estudiantes.component';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { EstudianteRestService } from 'src/app/servicios/rest/servicios/estudiante-rest.service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-crear-editar-estudiante',
  templateUrl: './crear-editar-estudiante.component.html',
  styleUrls: ['./crear-editar-estudiante.component.scss']
})
export class CrearEditarEstudianteComponent implements OnInit {

  crearEditarEstudiante: EstudianteInterface;
  formularioValido;
  estudiante: EstudianteInterface;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {estudiante: EstudianteInterface},
    public dialogo: MatDialogRef<RutaGestionEstudiantesComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _estudianteService: EstudianteRestService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,

  ) {
  }

  ngOnInit() {
  }
  validarFormulario(estudiante) {
    if (estudiante) {
      this.crearEditarEstudiante = estudiante;
      console.log('respuesta estudiante', this.crearEditarEstudiante);
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.estudiante) {
      this._estudianteService
        .updateOne(this.data.estudiante.id, this.crearEditarEstudiante)
        .subscribe(
          async r => {
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close(this.crearEditarEstudiante);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
          },
        );
    } else {
      this._estudianteService
        .create(this.estudiante)
        .subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            this.dialogo.close(r);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
          },
        );
    }
  }

}
