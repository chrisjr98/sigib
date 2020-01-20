import {Component, Inject, OnInit} from '@angular/core';
import {RentaFijaInterface} from '../../../../interfaces/interfaces/renta-fija.interface';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';
import {RutaGestionRentaFijaEmisorComponent} from '../../rutas/ruta-gestion-renta-fija-emisor/ruta-gestion-renta-fija-emisor.component';
import {RentaFijaEmisorRestService} from '../../../../servicios/rest/servicios/renta-fija-emisor-rest.service';
import {toastErrorEditar, toastExitoCrear, toastExitoEditar} from '../../../../constantes/mensajes-toaster';
import {RentaFijaEmisorInterface} from '../../../../interfaces/interfaces/renta-fija-emisor.interface';

@Component({
  selector: 'app-crear-editar-renta-fija-emisor',
  templateUrl: './crear-editar-renta-fija-emisor.component.html',
  styleUrls: ['./crear-editar-renta-fija-emisor.component.scss']
})
export class CrearEditarRentaFijaEmisorComponent implements OnInit {
  crearEditarRentaFijaEmisor: RentaFijaEmisorInterface;
  formularioValido;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogo: MatDialogRef<RutaGestionRentaFijaEmisorComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _rentaFijaEmisorRestService: RentaFijaEmisorRestService,
    // tslint:disable-next-line: variable-name
    private readonly _toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
  }

  validarFormulario(rentaFijaEmisor) {
    if (rentaFijaEmisor) {
      this.crearEditarRentaFijaEmisor = rentaFijaEmisor;
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.rentaFijaEmisor) {
      this._rentaFijaEmisorRestService
        .updateOne(this.data.rentaFijaEmisor.id, this.crearEditarRentaFijaEmisor)
        .subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoEditar);
            const consulta = {
              where: {
                id: this.data.rentaFijaEmisor.id,
              },
              relations: ['rentaFija']
            };
            this._rentaFijaEmisorRestService.findAll(JSON.stringify(consulta)).subscribe(
              res => {
                const primerElemento = res[0][0];
                this.dialogo.close(primerElemento);
              }
            );
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            this._toasterService.pop(toastErrorEditar);
          },
        );
    } else {
      this.crearEditarRentaFijaEmisor.habilitado = 1;
      this.crearEditarRentaFijaEmisor.emisor = this.data.emisor;
      this._rentaFijaEmisorRestService
        .create(this.crearEditarRentaFijaEmisor)
        .subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            this._toasterService.pop(toastExitoCrear);
            this.dialogo.close(r);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            // this._toasterService.pop(generarToasterErrorConMensaje('Error, talvez el código ya se encuentra registrado '));
          },
        );
    }
  }
}
