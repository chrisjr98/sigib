import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';
import {ParticipanteJuegoInterface} from '../../../interfaces/interfaces/participante-juego.interface';
import io from 'socket.io-client';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ParticipanteJuegoRestService extends PrincipalRestService<ParticipanteJuegoInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'participante-juego';
  }

  obtenerParticipantePorSala(datos) {
    const url = this.url + ':' + this.port + '/' + this.segmento + '/' + 'obtener-participante-por-sala?datos=' + JSON.stringify(datos);
    const respuesta = this._http.get(url);
    return respuesta;
  }

  obtenerParticipantesJugadasPorIdJuego(datos) {
    const url = this.url + ':' + this.port + '/' + this.segmento + '/' + 'jugadas-participante?datos=' + JSON.stringify(datos);
    const respuesta = this._http.get(url);
    return respuesta;
  }
}
