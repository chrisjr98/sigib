import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RutaGestionNivelComponent} from '../../rutas/ruta-gestion-nivel/ruta-gestion-nivel.component';
import {EmisorInterface} from '../../../../interfaces/interfaces/emisor.interface';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {NivelJuegoRestService} from '../../../../servicios/rest/servicios/nivel-juego-rest.service';
import {ToasterService} from 'angular2-toaster';
import {NivelJuegoInterface} from '../../../../interfaces/interfaces/nivel-juego.interface';
import {
  toastErrorCrear,
  toastErrorEditar,
  toastExitoCrear,
  toastExitoEditar
} from '../../../../constantes/mensajes-toaster';
import {ConfiguracionesInterface} from '../../../../interfaces/interfaces/configuraciones.interface';
import {ConfiguracionesRestService} from '../../../../servicios/rest/servicios/configuraciones-rest.service';
import {objectKeys} from 'codelyzer/util/objectKeys';

@Component({
  selector: 'app-crear-editar-nivel',
  templateUrl: './crear-editar-nivel.component.html',
  styleUrls: ['./crear-editar-nivel.component.scss']
})
export class CrearEditarNivelComponent implements OnInit {

  descripcionNivel: string;
  descripcionConfiguraciones: string;
  nivelCrearEditar: NivelJuegoInterface;
  formularioValidoNivel;
  nivelFormulario;

  configuracionCrearEditar: ConfiguracionesInterface;
  formularioValidoConfiguracion;
  configuracionFormulario;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { nivel: any },
    public dialogo: MatDialogRef<RutaGestionNivelComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _nivelJuegoRestService: NivelJuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    // tslint:disable-next-line:variable-name
    private readonly _configuracionesRestService: ConfiguracionesRestService,
  ) {
  }

  ngOnInit() {
    this.descripcionNivel = `Llene los campos necesarios para el nivel.`;
    this.nivelFormulario = this.data.nivel;
    this.descripcionConfiguraciones = `Llene los campos necesarios para las configuraciones.`;
    this.configuracionFormulario = this.data.nivel.configuraciones;
  }

  validarFormularioNivel(nivel) {
    if (nivel) {
      this.nivelCrearEditar = nivel;
      this.formularioValidoNivel = true;
    } else {
      this.formularioValidoNivel = false;
      this.nivelCrearEditar = {};
    }
  }

  validarFormularioRangos(configuracion) {
    if (configuracion) {
      this.configuracionCrearEditar = configuracion;
      this.formularioValidoConfiguracion = true;
    } else {
      this.formularioValidoConfiguracion = false;
      this.configuracionCrearEditar = {};
    }
  }


  async metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.nivel && this.data.nivel.configuraciones) {
      await this._configuracionesRestService
        .updateOne(this.data.nivel.configuraciones.id, this.configuracionCrearEditar)
        .subscribe(
          (configuraciones) => {
            this._cargandoService.deshabilitarCargando();
            this.configuracionCrearEditar = configuraciones;
            this.data.nivel.configuraciones = configuraciones;
            this.dialogo.close(this.data.nivel);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(toastErrorEditar);
          }
        );
      await this._nivelJuegoRestService
        .updateOne(this.data.nivel.id, this.nivelCrearEditar)
        .subscribe(
          () => {
            this._cargandoService.deshabilitarCargando();
            this.nivelCrearEditar.habilitado = +this.data.nivel.habilitado;
            // tslint:disable-next-line:max-line-length
            this.nivelCrearEditar.configuraciones = this.configuracionCrearEditar ? this.configuracionCrearEditar : this.data.nivel.configuraciones;
            this.nivelCrearEditar.id = this.data.nivel.id;
            this.dialogo.close(this.nivelCrearEditar);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(toastErrorEditar);
          },
        );
    } else {
      if (this.nivelCrearEditar && this.configuracionCrearEditar) {
        this.nivelCrearEditar.habilitado = true;
        await this._nivelJuegoRestService
          .create(this.nivelCrearEditar)
          .subscribe(
            r => {
              r.habilitado = +r.habilitado;
              this.configuracionCrearEditar.nivelJuego = r.id;
              this._configuracionesRestService
                .create(this.configuracionCrearEditar)
                .subscribe(
                  respuesta => {
                    r.configuraciones = respuesta;
                    this._cargandoService.deshabilitarCargando();
                    this._toasterService.pop(toastExitoCrear);
                    this.dialogo.close(r);
                  },
                  err => {
                    this._cargandoService.deshabilitarCargando();
                    console.error(err);
                    this._toasterService.pop(toastErrorCrear);
                  },
                );
            },
            err => {
              this._cargandoService.deshabilitarCargando();
              console.error(err);
              this._toasterService.pop(toastErrorCrear);
            },
          );
      } else {
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(toastErrorCrear);
      }
    }
  }

}
