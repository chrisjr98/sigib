import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RutaGestionRentaFijaComponent} from '../../rutas/ruta-gestion-renta-fija/ruta-gestion-renta-fija.component';
import {ToasterService} from 'angular2-toaster';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {RentaFijaRestService} from '../../../../servicios/rest/servicios/renta-fija-rest.service';
import {RentaFijaInterface} from '../../../../interfaces/interfaces/renta-fija.interface';

@Component({
  selector: 'app-crear-editar-renta-fija',
  templateUrl: './crear-editar-renta-fija.component.html',
  styleUrls: ['./crear-editar-renta-fija.component.scss']
})
export class CrearEditarRentaFijaComponent implements OnInit {
  crearEditarPapelRentaFija: RentaFijaInterface;
  formularioValido;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogo: MatDialogRef<RutaGestionRentaFijaComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _rentaFijaRestService: RentaFijaRestService,
    // tslint:disable-next-line: variable-name
    private readonly _toasterService: ToasterService,
  ) { }

  ngOnInit() {
  }

  validarFormulario(rentaFija) {
    if (rentaFija) {
      this.crearEditarPapelRentaFija = rentaFija;
      this.formularioValido = true;
    } else {
      this.formularioValido = false;
    }
  }

  metodoCrearEditar() {
    this._cargandoService.habilitarCargando();
    if (this.data.rentaFija) {
      this._rentaFijaRestService
        .updateOne(this.data.rentaFija.id, this.crearEditarPapelRentaFija)
        .subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            //   this._toasterService.pop(toastExitoEditar);
            this._rentaFijaRestService.findOne(this.data.rentaFija.id).subscribe(
              res => {
                this.dialogo.close(res);
              }
            );
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            //  this._toasterService.pop(toastErrorEditar);
          },
        );
    } else {
      this.crearEditarPapelRentaFija.habilitado = 1;
      this._rentaFijaRestService
        .create(this.crearEditarPapelRentaFija)
        .subscribe(
          r => {
            this._cargandoService.deshabilitarCargando();
            //    this._toasterService.pop(toastExitoCrear);
            this.dialogo.close(r);
          },
          err => {
            this._cargandoService.deshabilitarCargando();
            console.error(err);
            //   this._toasterService.pop(generarToasterErrorConMensaje('Error, talvez el código ya se encuentra registrado '));
          },
        );
    }
  }

}
