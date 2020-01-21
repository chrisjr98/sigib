import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ParticipanteRestService} from '../../../servicios/rest/servicios/participante-rest.service';
import {JuegoRestService} from '../../../servicios/rest/servicios/juego-rest.service';
import {SocketJuegoService} from '../../../servicios/rest/servicios/socket-juego-rest.service';
import {mergeMap} from 'rxjs/operators';
import {CargandoService} from '../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-listar-jugadores',
  templateUrl: './listar-jugadores.component.html',
  styleUrls: ['./listar-jugadores.component.scss']
})
export class ListarJugadoresComponent implements OnInit {

  @Input() arregloJugadores: any[];
  @Input() idJuego: number;

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _participanteRestService: ParticipanteRestService,
    // tslint:disable-next-line:variable-name
    private readonly _juegoRestService: JuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _socketJuegoService: SocketJuegoService,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
  }

  empezarPartida() {
    this._cargandoService.habilitarCargando();
    const consulta = {
      estado: 'E'
    };
    const rutaAdministrador = ['../administrador', 'menu', 'juegos', 'juego-seleccionado', this.idJuego];
    this._juegoRestService
      .updateOne(this.idJuego, consulta)
      .pipe(
        mergeMap(() => {
          return this._juegoRestService.findOne(this.idJuego);
        })
      )
      .subscribe((r) => {
        this._router
          .navigate(rutaAdministrador, {
              queryParams: {
                ronda: 0,
                caja: true,
                empezarRonda: false,
              }
            }
          );
        this._cargandoService.deshabilitarCargando();
      }, error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop('error', 'Error', 'Error al empezar el juego');
      });
  }

}
