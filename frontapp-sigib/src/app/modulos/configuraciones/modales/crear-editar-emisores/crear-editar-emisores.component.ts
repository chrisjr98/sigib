import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EmisorInterface} from '../../../../interfaces/interfaces/emisor.interface';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {EmisorRestService} from '../../../../servicios/rest/servicios/emisor-rest.service';
import {ToasterService} from 'angular2-toaster';
import {RutaGestionEmisoresComponent} from '../../rutas/ruta-gestion-emisores/ruta-gestion-emisores.component';
import {toastErrorEditar, toastExitoCrear, toastExitoEditar} from '../../../../constantes/mensajes-toaster';

@Component({
  selector: 'app-crear-editar-emisores',
  templateUrl: './crear-editar-emisores.component.html',
  styleUrls: ['./crear-editar-emisores.component.scss']
})
export class CrearEditarEmisoresComponent implements OnInit {

  descripcion: string;
  emisorCrearEditar: EmisorInterface;
  formularioValido;
  emisorFormulario;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {emisor: EmisorInterface, tipoEmisor},
    public dialogo: MatDialogRef<RutaGestionEmisoresComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _emisorRestService: EmisorRestService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
  ) { }

  ngOnInit() {
    this.descripcion = `Llene los campos necesarios para el emisor.`;
    this.emisorFormulario = this.data.emisor;
  }

  validarFormulario(emisor) {
    if (emisor) {
      this.emisorCrearEditar = emisor;
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
      // this.emisorCrearEditar = {};
    }
  }


  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    let idEmisor;
    if (!this.data.emisor) {
      this.emisorCrearEditar.habilitado = 1;
      this.emisorCrearEditar.vendeRentaFija = 1;
      this.emisorCrearEditar.vendeAcciones = 1;
    } else {
      idEmisor = this.data.emisor.id;
    }
    this._emisorRestService.guardarEmisor(this.emisorCrearEditar, this.emisorCrearEditar.archivoLogo, idEmisor)
      .subscribe( (respuesta: EmisorInterface) => {
        respuesta.habilitado = +respuesta.habilitado;
        respuesta.vendeRentaFija = +respuesta.vendeRentaFija;
        respuesta.vendeAcciones = +respuesta.vendeAcciones;
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop('success', 'Éxito', 'Registro guardado exitosamente');
        this.dialogo.close(respuesta);
      }, error => {
        this._cargandoService.deshabilitarCargando();
        console.error(error);
        this._toasterService.pop(toastErrorEditar);
        this.dialogo.close();
      });
  }

}
