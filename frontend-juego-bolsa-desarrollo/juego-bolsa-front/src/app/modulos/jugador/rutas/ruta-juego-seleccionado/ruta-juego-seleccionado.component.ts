import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SocketJuegoService} from '../../../../servicios/rest/servicios/socket-juego-rest.service';
import {JuegoRestService} from '../../../../servicios/rest/servicios/juego-rest.service';
import {mergeMap} from 'rxjs/operators';
import {MostrarListaAuspiciantesService} from '../../../../servicios/mostrar-lista-auspiciantes/mostrar-lista-auspiciantes.service';
import {LocalStorageService} from '../../../../servicios/rest/servicios/local-storage.service';

@Component({
  selector: 'app-juego-seleccionado',
  templateUrl: './ruta-juego-seleccionado.component.html',
  styleUrls: ['./ruta-juego-seleccionado.component.scss']
})
export class RutaJuegoSeleccionadoComponent implements OnInit {

  idJuego;
  idRonda;
  noticia = false;
  datosJuego;
  queryParams: any = {};

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly _socketJuegoService: SocketJuegoService,
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _juegoRestService: JuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _mostrarListaAuspiciantesService: MostrarListaAuspiciantesService,
    // tslint:disable-next-line:variable-name
    private readonly _localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    this._activatedRoute.paramMap
      .pipe(
        mergeMap(params => {
            this.idJuego = params.get('idJuego');
            const datos = this._localStorageService.obtenerDatosLocalStorage(this.idJuego);
            if (datos === undefined) {
              const url = ['/jugador', 'ingresar-juego', this.idJuego];
              this._router.navigate(url);
            } else {
              return this._juegoRestService
                .findOne(this.idJuego);
            }
          }
        ),
        mergeMap(juego => {
            this.datosJuego = juego;
            return this._activatedRoute.queryParams;
          }
        ),
      )
      .subscribe(
        (queryParams) => {
          const rutaJuegoSeleccionado = ['/jugador', 'juego-seleccionado', this.idJuego];
          this.queryParams = {
            ...queryParams
          };
          // NO ME CONVENCE ESTE IF
          if (this.datosJuego.estado === 'I' || this.datosJuego.estado === 'E') {
            this._mostrarListaAuspiciantesService.mostrar();
          } else if (this.datosJuego.estado !== 'I' || this.datosJuego.estado === 'E') {
            this._mostrarListaAuspiciantesService.ocultar();
          }
          this._socketJuegoService
            .eventoEmpezarRonda
            .subscribe(
              (infoRonda) => {
                const verificarSalaJuego = (this.datosJuego.nombreSala === infoRonda.juego.nombreSala);
                if (verificarSalaJuego) {
                  this.queryParams.ronda = infoRonda.ronda;
                  this.queryParams.idRonda = infoRonda.idRonda;
                  this.queryParams.empezarRonda = infoRonda.empezarRonda;
                  this._mostrarListaAuspiciantesService.ocultar();
                  this._router.navigate(rutaJuegoSeleccionado, {queryParams: this.queryParams});
                }
              });

          this._socketJuegoService
            .eventoJuegoActualizado
            .subscribe(
              (r) => {
                if (this.datosJuego.nombreSala === r.juego.nombreSala) {
                  this._mostrarListaAuspiciantesService.ocultar();
                }
              });

        });
    this._socketJuegoService
      .eventoCambiosJuego
      .subscribe(
        r => {
          this.noticia = r.estado.noticiasMostrarOcultar;
          // this.noticia.push(r);
        });

    this._socketJuegoService
      .eventoAyuda
      .subscribe(r => {
      });
  }
}
