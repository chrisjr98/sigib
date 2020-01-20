import {Component, Input, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {JuegoRestService} from '../../../../servicios/rest/servicios/juego-rest.service';
import {ParticipanteRestService} from '../../../../servicios/rest/servicios/participante-rest.service';
import {SocketJuegoService} from '../../../../servicios/rest/servicios/socket-juego-rest.service';
import {ParticipanteInterface} from '../../../../interfaces/interfaces/participante.interface';
import {LocalStorageService} from '../../../../servicios/rest/servicios/local-storage.service';
import {RespuestaUnirseJuegoInterface} from '../../../../interfaces/interfaces/respuesta-unirse-juego.interface';
import {ParticipanteJuegoRestService} from '../../../../servicios/rest/servicios/participante-juego-rest.service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-ingresar-juego',
  templateUrl: './ruta-ingresar-juego.component.html',
  styleUrls: ['./ruta-ingresar-juego.component.scss']
})
export class RutaIngresarJuegoComponent implements OnInit {

  datosJugador;
  idJuego: number;
  datosJuego;
  participantesJuego: string[] = [];
  rondaActual;
  juegoAIngresar: number;
  idRonda;

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _cookieService: CookieService,
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly _juegoRestService: JuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _participanteRestService: ParticipanteRestService,
    // tslint:disable-next-line:variable-name
    private readonly _participantePorJuegoRestService: ParticipanteJuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _socketJuegoService: SocketJuegoService,
    // tslint:disable-next-line:variable-name
    private readonly _localStorageService: LocalStorageService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
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
            .subscribe(
              respuesta => {
                this.datosJuego = respuesta;
                this.buscarRondaPorJuego(this.datosJuego.nombreSala);
                this.verificarParticipanteIngreso();
              }
            );
        }
      );
    this.verificarParticipanteIngreso();
    this._socketJuegoService
      .eventoEmpezarRonda
      .subscribe(
        r => {
          this.rondaActual = r.ronda;
          this.juegoAIngresar = r.juego.nombreSala;
          this.idRonda = r.idRonda;
          // this.rondaActual = r.ronda;
        }
      );
    this._socketJuegoService
      .eventoJuegoActualizado
      .subscribe(
        r => {
        }
      );
  }

  formularioValido(evento) {
    this.datosJugador = evento;
  }

  async ingresarYRegistrarJugador() {
    const datos = {
      participante: this.datosJugador,
      juego: this.datosJuego
    };
    const passwordValidadas = (this.datosJuego.passwordRonda === this.datosJugador.password);
    if (passwordValidadas) {
      try {
        const respuesta = await this._participanteRestService
          .agregarParticipante(datos);
        this.unirseARoom(respuesta);
      } catch (e) {
        console.error({
          error: e,
          mensaje: ''
        });
      }

    } else {
      this._toasterService
        .pop(
          'warning',
          'Error',
          'La contraseña del juego es incorrecta'
        );
    }
  }

  unirseARoom(participante) {
    this._socketJuegoService
      .unirseJuego(this.datosJuego, participante)
      .then(
        (respuestaUnirseJuego: RespuestaUnirseJuegoInterface) => {
          const datosLocalStorage = {
            idParticipante: participante.id,
            nombreParticipante: this.datosJugador.nombre,
            nombreSala: respuestaUnirseJuego.sala
          };
          this._localStorageService
            .guardarEnLocalStorage(
              datosLocalStorage,
              this.idJuego,
            );
          this.irARutaDeEspera();
        }
      );
  }

  irARutaDeEspera() {
    const url = ['/jugador', 'juego-seleccionado', this.idJuego];
    this._router
      .navigate(
        url,
        {
          queryParams: {
            ronda: 0,
            idRonda: 0,
          }
        }
      );
  }

  verificarParticipanteIngreso() {
    const usuarioLocalStorage = this._localStorageService.obtenerDatosLocalStorage(this.idJuego);
    if (usuarioLocalStorage !== undefined) {
      this._participantePorJuegoRestService
        .obtenerParticipantePorSala(usuarioLocalStorage[0])
        .subscribe(
          r => {
            if (r[0].length > 0) {
              this._router.navigate(['../jugador', 'juego-seleccionado', this.idJuego], {
                queryParams: {ronda: this.rondaActual},
              });
            }
          }, error => {
            console.error(error);
          }
        );
    }
  }

  buscarRondaPorJuego(nombreSala: string) {
    const consulta = {
      where: {
        nombreSala: `${nombreSala}`
      },
      relations: ['rondas']
    };
    this._juegoRestService
      .findAll(JSON.stringify(consulta))
      .subscribe(
        r => {
          if (r[0][0].rondas.length > 0) {
            this.rondaActual = r[0][0].rondas.filter(ronda => ronda.estado === 'C')[0].numeroRonda;
          } else {
            this.rondaActual = 0;
          }
        }
      );
  }
}
