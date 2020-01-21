import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SocketJuegoService} from '../../../../servicios/rest/servicios/socket-juego-rest.service';
import {QueryParamsJuegoInterface} from '../../../../interfaces/interfaces/query-params-juego.interface';
import {JuegoRestService} from '../../../../servicios/rest/servicios/juego-rest.service';
import {LocalStorageService} from '../../../../servicios/rest/servicios/local-storage.service';

@Component({
  selector: 'app-ruta-juego-seleccionado',
  templateUrl: './ruta-juego-seleccionado.component.html',
  styleUrls: ['./ruta-juego-seleccionado.component.scss']
})
export class RutaJuegoSeleccionadoComponent implements OnInit {

  idJuego;
  datosJuego;
  ronda;
  queryParams: QueryParamsJuegoInterface = {};

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly _socketJuegoService: SocketJuegoService,
    // tslint:disable-next-line:variable-name
    private readonly _juegoRestService: JuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    this._activatedRoute
      .params
      .subscribe(
        r => {
          this.idJuego = r.idJuego;
          this._juegoRestService
            .findOne(this.idJuego)
            .subscribe(respuesta => {
              this.datosJuego = respuesta;
            });
        });
    this._activatedRoute.queryParams
      .subscribe(
        queryParams => {
          this.queryParams = queryParams.ronda ? queryParams.ronda : 0;
        });
  }

}
