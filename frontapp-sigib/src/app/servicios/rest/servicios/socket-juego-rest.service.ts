import {EventEmitter, Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../../../environments/environment';
import {JuegoInterface} from '../../../interfaces/interfaces/juego.interface';
import {ParticipanteInterface} from '../../../interfaces/interfaces/participante.interface';
import {
  RespuestaAyudaSocketInterface,
} from '../../../compartido/juego-administrador-jugador/juego-administrador-jugador/juego-administrador-jugador.component';
import {EmpezarRondaInterface} from '../../../interfaces/interfaces/empezar-ronda.interface';

@Injectable({providedIn: 'root'})
export class SocketJuegoService {
  socket;
  estaConectado = false;
  eventoConectado: EventEmitter<any> = new EventEmitter();
  eventoDesconectado: EventEmitter<any> = new EventEmitter();
  eventoParticipanteAgregado: EventEmitter<any> = new EventEmitter();
  eventoJuegoCreado: EventEmitter<any> = new EventEmitter();
  eventoJuegoActualizado: EventEmitter<any> = new EventEmitter();
  eventoCambiosJuego: EventEmitter<any> = new EventEmitter();
  eventoEmpezarRonda: EventEmitter<EmpezarRondaInterface> = new EventEmitter();
  eventoAyuda: EventEmitter<any> = new EventEmitter();
  eventojugadasParticipante: EventEmitter<any> = new EventEmitter();
  eventoRecibirRakingParticipantes: EventEmitter<any> = new EventEmitter();
  eventoFinalizarRonda: EventEmitter<any> = new EventEmitter();
  eventoEmpezarContador: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.iniciar();
  }

  iniciar() {
    this.socket = io(
      `${environment.socket}`
    );
    this.socket.on('connect', respuesta => {
      this.estaConectado = true;
      this.eventoConectado.emit(this.estaConectado);
    });

    this.socket.on('disconnect', respuesta => {
      this.estaConectado = false;
      this.eventoDesconectado.emit(this.estaConectado);
    });

    this.socket.on('participanteAgregado', datos => {
      this.eventoParticipanteAgregado.emit(datos);
    });

    this.socket.on('juegoCreado', datos => {
      this.eventoJuegoCreado.emit(datos);
    });

    this.socket.on('juegoActualizado', datos => {
      this.eventoJuegoActualizado.emit(datos);
    });

    this.socket.on('noticias', datos => {
      this.eventoCambiosJuego.emit(datos);
    });

    this.socket.on('ayuda', datos => {
      this.eventoAyuda.emit(datos);
    });

    this.socket.on('cambioRonda', (objetoEmpezarRonda: EmpezarRondaInterface) => {
      this.eventoEmpezarRonda.emit(objetoEmpezarRonda);
    });

    this.socket.on('visualizarJugadasParticipante', datos => {
      this.eventojugadasParticipante.emit(datos);
    });

    this.socket.on('rakingParticipantes', datos => {
      this.eventoRecibirRakingParticipantes.emit(datos);
    });

    this.socket.on('terminaRonda', datos => {
      this.eventoFinalizarRonda.emit(datos);
    });

    this.socket.on('comenzarContador', datos => {
      this.eventoEmpezarContador.emit(datos);
    });
  }

  unirseJuego(juego: JuegoInterface, participante?: ParticipanteInterface): Promise<{ error?: number; mensaje?: string; }> {
    return new Promise(
      (res, rej) => {
        this.socket
          .emit('unirseARoomJuego', {juego, participante},
            (respuesta: { mensaje: string }) => {
              if (respuesta.mensaje) {
                res(respuesta);
              } else {
                rej({error: 500});
              }
            }
          );
      }
    );
  }

  cambioJuego(idJuego: number): Promise<{ error?: number; mensaje?: string; }> {
    return new Promise(
      (res, rej) => {
        this.socket.emit('buscarJuego', {idJuego},
          (respuesta: { mensaje: string }) => {
            if (respuesta.mensaje) {
              res(respuesta);
            } else {
              rej({error: 500});
            }
          });
      }
    );
  }

  enviarNoticias(datos): Promise<{ error?: number; respuesta?: RespuestaAyudaSocketInterface; }> {
    return new Promise(
      (res, rej) => {
        this.socket.emit('mostrarNoticia', datos,
          (respuesta: RespuestaAyudaSocketInterface) => {
            if (respuesta) {
              res({respuesta});
            } else {
              rej({error: 500});
            }
          });
      }
    );
  }

  enviarAyuda(datos): any {
    return new Promise(
      (res, rej) => {
        this.socket.emit('ayudaJugada', datos,
          (respuesta) => {
            if (respuesta) {
              res({respuesta});
            } else {
              rej({error: 500});
            }
          });
      }
    );
  }

  empezarRonda(ronda: number, juego?: JuegoInterface, idRonda?: number, empezarRonda?: boolean): Promise<any> {
    return new Promise(
      (res, rej) => {
        this.socket.emit('comenzarRonda', {ronda, juego, idRonda, empezarRonda},
          (respuesta) => {
            if (respuesta) {
              res(respuesta);
            } else {
              rej({error: 500});
            }
          });
      }
    );
  }

  jugadasParticipante(ronda: number, juego: JuegoInterface): Promise<{ error?: number; mensaje?: string; }> {
    return new Promise(
      (res, rej) => {
        this.socket.emit('jugadasParticipante', {ronda, juego},
          (respuesta: { mensaje: string }) => {
            if (respuesta.mensaje) {
              res(respuesta);
            } else {
              rej({error: 500});
            }
          });
      }
    );
  }

  terminarJuego(rakingJugadores, juego: JuegoInterface) {
    return new Promise(
      (res, rej) => {
        this.socket.emit('terminarJuego', {rakingJugadores, juego},
          (respuesta) => {
            if (respuesta) {
              res(respuesta);
            } else {
              rej({error: 500});
            }
          }
        );
      }
    );
  }

  terminarRonda(estadoRonda) {
    return new Promise(
      (res, rej) => {
        this.socket.emit('terminarRonda', {estadoRonda},
          (respuesta) => {
            if (respuesta) {
              res(respuesta);
            } else {
              rej({error: 500});
            }
          }
        );
      }
    );
  }

  empezarContador(juego: JuegoInterface) {
    return new Promise(
      (res, rej) => {
        this.socket.emit('empezarContador', {juego},
          (respuesta) => {
            if (respuesta) {
              res(respuesta);
            } else {
              rej({error: 500});
            }
          }
        );
      }
    );
  }

}
