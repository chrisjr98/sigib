import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';
import {JuegoInterface} from '../../../interfaces/interfaces/juego.interface';
import io from 'socket.io-client';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class JuegoRestService extends PrincipalRestService<JuegoInterface> {
  socketBolsa = io(environment.socket);

  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'juego';
  }

  crearJuego(datosJuego) {
    const crearJuegoPromise = new Promise((resolve, reject) => {
      this.socketBolsa.emit('crearJuego', datosJuego, (salaCreada) => {
        resolve(salaCreada);
      });
    });
    return from(crearJuegoPromise);
  }

  listarJugadres() {
    const obtenerPromesa = new Promise((resolve, reject) => {
      this.socketBolsa.emit('mostrarJugadores', '', (respuesta) => {
        resolve(respuesta);
      });
    });
    return from(obtenerPromesa);
  }

  registrarJugadasParticipante(datos: any): Observable<any> {
    return this._http.post(
      this.url +
      `:${this.port}/${this.segmento}/registrar-jugada-jugador?datos=${JSON.stringify(
        datos,
      )}`
      , datos);
  }

  calcularRondaJugadas(datos: any): Observable<any> {
    return this._http.post(
      this.url +
      `:${this.port}/${this.segmento}/calculo-ronda-jugadores?datos=${JSON.stringify(
        datos,
      )}`
      , datos);
  }

  buscarJuegoPorNombre(palabra: string): Observable<[JuegoInterface[], number]> {
    const url = `${this.url}:${this.port}/${this.segmento}/buscarJuegoPorNombre?palabra=${palabra}`;
    return this._http
      .get(url)
      .pipe(
        map(
          (data) => data as [JuegoInterface[], number] // Tipar la respuesta
        )
      );
  }
}
