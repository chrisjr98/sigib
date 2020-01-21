import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PATH_IMAGEN} from '../../../constantes/opciones-menu-inicio';
import {Router} from '@angular/router';
import {JuegoInterface} from '../../../interfaces/interfaces/juego.interface';
import {ParticipanteJuegoRestService} from '../../../servicios/rest/servicios/participante-juego-rest.service';
import {SocketJuegoService} from '../../../servicios/rest/servicios/socket-juego-rest.service';
import {JuegoRestService} from '../../../servicios/rest/servicios/juego-rest.service';
import {LocalStorageService} from '../../../servicios/rest/servicios/local-storage.service';
import {ToasterService} from 'angular2-toaster';
import {generarMensajePersonalizado} from '../../../constantes/mensajes-toaster';
import {CargandoService} from '../../../servicios/cargando-service/cargando-service';

@Component({
  selector: 'app-lista-juegos',
  templateUrl: './lista-juegos.component.html',
  styleUrls: ['./lista-juegos.component.scss']
})
export class ListaJuegosComponent implements OnInit {
  @Input() arregloJuegos: JuegoInterface[];
  @Input() tipoUsuario: any;
  @Output() enviarDatosRonda: EventEmitter<object> = new EventEmitter();
  @Input() mostrarAdmin = false;

  path = PATH_IMAGEN;
  rondaActual;
  juego: JuegoInterface;

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _participanteJuegoRestService: ParticipanteJuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _socketJuegoService: SocketJuegoService,
    // tslint:disable-next-line:variable-name
    private readonly _juegoRestService: JuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _localStorageService: LocalStorageService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
  ) {
  }

  ngOnInit() {
    this._socketJuegoService
      .eventoEmpezarRonda
      .subscribe(
        r => {
          this.enviarDatosRonda.emit(r);
          this.rondaActual = r.ronda;
          this.juego = r.juego;
        }
      );
  }

  irJuego(juego) {
    this.accionPorTipoUsuario(juego);
  }

  accionPorTipoUsuario(juego) {
    const esJugador = this.tipoUsuario === 'jugador';
    const esAdministrador = this.tipoUsuario === 'administrador';
    if (esJugador) {
      const url = ['/jugador', 'ingresar-juego', juego.id];
      if (juego.estado === 'I') {
        this._router.navigate(url);
      } else {
        const registros = this._localStorageService
          .obtenerDatosLocalStorage(juego.id);
        const estadosJuego = (juego.estado === 'I' || juego.estado === 'E' || juego.estado === 'J');
        if (registros !== undefined) {
          const jugadorRegistrado = registros[0];
          const verificarJugador = (jugadorRegistrado.nombreSala === juego.nombreSala);
          if (verificarJugador && estadosJuego) {
            return this._router.navigate(url);
          }
        } else {
          if (juego.estado === 'CO') {
            const mensajeFin = generarMensajePersonalizado(
              'ERROR',
              'El juego ya ha finalizado, no puede ingresar',
              'warning',
            );
            this._toasterService.pop(mensajeFin);
          }
          if (juego.estado === 'J') {
            const mensajeJuego = generarMensajePersonalizado(
              'ERROR',
              'El juego ya ha iniciado, no puede ingresar',
              'warning',
            );
            this._toasterService.pop(mensajeJuego);
          }
          if (juego.estado === 'E') {
            const mensajeEspera = generarMensajePersonalizado(
              'ERROR',
              'El juego está en espera, ya no puede ingresar',
              'warning',
            );
            this._toasterService.pop(mensajeEspera);
          }
        }
      }
    }
    if (esAdministrador) {
      const juegosCreados = juego.estado === 'I';
      const juegosPorIniciar = juego.estado === 'E' || juego.estado === 'J';
      if (juegosCreados) {
        const urlJuegosCreados = ['/administrador', 'menu', 'juegos', 'listar-jugadores', juego.id];
        return this._router.navigate(urlJuegosCreados);
      } else {
        const consulta = {
          where: {
            nombreSala: `${juego.nombreSala}`
          },
          relations: ['rondas']
        };
        this._cargandoService.habilitarCargando();
        this._juegoRestService
          .findAll(JSON.stringify(consulta))
          .subscribe(
            (juegos) => {
              this.rondaActual = juegos[0][0]
                .rondas
                .filter(ronda => ronda.estado === 'C')[0].numeroRonda;
              this._cargandoService.deshabilitarCargando();
              const rutaJuegoAdmin = ['../administrador', 'menu', 'juegos', 'juego-seleccionado', juego.id];
              return this._router.navigate(rutaJuegoAdmin, {queryParams: {ronda: this.rondaActual ? this.rondaActual : 0}});
            },
            (error) => {
              this._cargandoService.deshabilitarCargando();
              console.error({
                error,
                mensaje: 'Error cargando juego'
              });
              this._toasterService.pop('error', 'Error', 'Error del servidor. Inténtalo más tarde');
            }
          );
      }
    }
  }
}
