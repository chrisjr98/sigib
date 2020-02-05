import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';

@Component({
  selector: 'app-registro-comprobante',
  templateUrl: './registro-comprobante.component.html',
  styleUrls: ['./registro-comprobante.component.scss']
})
export class RegistroComprobanteComponent implements OnInit {

 datosComprobante;

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    // tslint:disable-next-line:variable-name
    private readonly _cargadoService: CargandoService,
  ) {
  }

  ngOnInit() {

  }

  formularioValido(evento) {
    this.datosComprobante = evento;
  }

  async crearComprobante() {
    const rutaAjustes = ['../administrador/menu/facturacion/menu-factura/comprobante'];
    return this._router.navigate(rutaAjustes);
  }

}
