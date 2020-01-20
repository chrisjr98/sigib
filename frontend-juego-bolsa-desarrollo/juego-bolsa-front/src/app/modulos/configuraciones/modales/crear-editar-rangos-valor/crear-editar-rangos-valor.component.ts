import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RutaGestionNivelComponent} from '../../rutas/ruta-gestion-nivel/ruta-gestion-nivel.component';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';
import {ConfiguracionesRestService} from '../../../../servicios/rest/servicios/configuraciones-rest.service';
import {ConfiguracionesInterface} from '../../../../interfaces/interfaces/configuraciones.interface';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar
} from '../../../../constantes/mensajes-toaster';
import {NivelJuegoRestService} from '../../../../servicios/rest/servicios/nivel-juego-rest.service';
import {NivelJuegoInterface} from '../../../../interfaces/interfaces/nivel-juego.interface';

@Component({
  selector: 'app-crear-editar-rangos-valor',
  templateUrl: './crear-editar-rangos-valor.component.html',
  styleUrls: ['./crear-editar-rangos-valor.component.scss']
})
export class CrearEditarRangosValorComponent implements OnInit {

  descripcion: string;
  configuracionCrearEditar: ConfiguracionesInterface;
  mensajeCabecera: string;
  formularioValido;
  configuracionFormulario;
  esNuevoRegistro;
  verDetalles;
  idNivelCreado;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogo: MatDialogRef<RutaGestionNivelComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _configuracionesRestService: ConfiguracionesRestService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    // tslint:disable-next-line:variable-name
    private readonly _nivelJuegoRestService: NivelJuegoRestService,
  ) { }

  ngOnInit() {
    this.descripcion = `Llene los campos necesarios para las configuraciones.`;
    this.configuracionFormulario = this.data.configuracion;
    this.esNuevoRegistro = this.data.esNuevo;
    this.verDetalles = this.data.esVerDetalles;
    const verDetalle = !this.esNuevoRegistro && this.verDetalles;
    const esEditar = !this.esNuevoRegistro && !this.verDetalles;
    if (verDetalle) {
      this.mensajeCabecera = 'VER';
    } else if (esEditar) {
      this.mensajeCabecera =  'EDITAR';
    } else {
      this.mensajeCabecera =  'CREAR';
    }
  }

  validarFormulario(configuracion) {
    if (configuracion) {
      this.configuracionCrearEditar = configuracion;
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
      // this.emisorCrearEditar = {};
    }
  }

  async metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.configuracion) {
      await this._configuracionesRestService
        .updateOne(this.data.configuracion.id, this.configuracionCrearEditar)
        .subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            this.dialogo.close(this.configuracionCrearEditar);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(toastErrorEditar);
          },
        );
    } else {
      await this._configuracionesRestService
        .create(this.configuracionCrearEditar)
        .subscribe(
          async r => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoCrear);
            await this.dialogo.close(r);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(toastErrorCrear);
          },
        );
    }
  }

}
