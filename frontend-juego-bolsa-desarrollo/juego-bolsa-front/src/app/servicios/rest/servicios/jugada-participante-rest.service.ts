import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';
import {JugadaParticipanteInterface} from '../../../interfaces/interfaces/jugada-participante.interface';
import {Observable} from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class JugadaParticipanteRestService extends PrincipalRestService<JugadaParticipanteInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'jugada-participante';
  }
  obtenerJugadasCalculadasJugador(datos: any): Observable<any> {
    return this._http.get(
      this.url +
      `:${this.port}/${this.segmento}/buscar-jugadar-jugador?datos=${JSON.stringify(
        datos,
      )}`,
    );
  }

  verificarJugadaParticipante(datos: any): Observable<any> {
    return this._http.get(
      this.url +
      `:${this.port}/${this.segmento}/verificar-jugada-participante?datos=${JSON.stringify(
        datos,
      )}`,
    );
  }
}
