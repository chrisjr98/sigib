import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';
import {NoticiasRondaInterface} from '../../../interfaces/interfaces/noticias-ronda.interface';
import {Observable} from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class NoticiasRondaRestService extends PrincipalRestService<NoticiasRondaInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'noticias-ronda';
  }

  obtenerNoticiasRondaRandom(
    datos,
  ): Observable<any> {
    return this._http.get(
      this.url +
      `:${this.port}/${
        this.segmento
      }/buscar-noticias-ronda-random?datos=${JSON.stringify(
        datos,
      )}`,
    );
  }

  obtenerNoticiasRonda(
    datos,
  ): Observable<any> {
    return this._http.get(
      this.url +
      `:${this.port}/${
        this.segmento
      }/buscar-noticias-ronda?datos=${JSON.stringify(
        datos,
      )}`,
    );
  }
}
