import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';
import {NivelJuegoInterface} from '../../../interfaces/interfaces/nivel-juego.interface';
import {Observable} from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class NivelJuegoRestService extends PrincipalRestService<NivelJuegoInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'nivel-juego';
  }

  obtenerNivelesLike(
    datos,
  ): Observable<any> {
    return this._http.get(
      this.url +
      `:${this.port}/${
        this.segmento
      }/buscar-niveles-like?datos=${JSON.stringify(
        datos,
      )}`,
    );
  }
}
