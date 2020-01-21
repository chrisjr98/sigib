import {Component, EventEmitter, HostListener, OnInit} from '@angular/core';
import {CargandoService} from './servicios/cargando-service/cargando-service';
import {MostrarListaAuspiciantesService} from './servicios/mostrar-lista-auspiciantes/mostrar-lista-auspiciantes.service';
import {SocketJuegoService} from './servicios/rest/servicios/socket-juego-rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'juego-bolsa-front';
  bloqueado = false;
  mostrarListaAuspiciantes = false;

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _mostrarListaAuspiciantes: MostrarListaAuspiciantesService,
    // tslint:disable-next-line:variable-name
    private readonly _socketJuegoService: SocketJuegoService,
  ) {
  }

  ngOnInit(): void {
    this.escucharCambiosEnCargandoService();
    this.escucharCambiosMostrarListaAuspiciantes();
  }

  escucharCambiosEnCargandoService() {
    this._cargandoService
      .cambioCargando
      .subscribe(
        (cambio) => {
          this.bloqueado = cambio;
        }
      );
  }

  escucharCambiosMostrarListaAuspiciantes() {
    this._mostrarListaAuspiciantes
      .cambioMostrar
      .subscribe(
        (cambio) => {
          this.mostrarListaAuspiciantes = cambio;
        }
      );
  }
}
