import { Component, OnInit, Inject } from '@angular/core';
import { CarreraInterface } from 'src/app/interfaces/interfaces/carrera.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RutaGestionCarrerasComponent } from '../../rutas/ruta-gestion-carreras/ruta-gestion-carreras.component';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-crear-editar-carrera',
  templateUrl: './crear-editar-carrera.component.html',
  styleUrls: ['./crear-editar-carrera.component.scss']
})
export class CrearEditarCarreraComponent implements OnInit {

 crearEditarCarrera: CarreraInterface;
  formularioValido;
  carrera: CarreraInterface;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {carrera: CarreraInterface},
    public dialogo: MatDialogRef<RutaGestionCarrerasComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,

  ) {
  }

  ngOnInit() {
  }
  validarFormulario(usuario) {
    if (usuario) {
      this.crearEditarCarrera = usuario;
      this.formularioValido = true;
    } else {
      this.formularioValido = true;
    }
  }

  metodoCrearEditar() {

  }

}
