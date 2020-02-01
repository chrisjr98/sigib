import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';
import {NoticiaInterface} from '../../../interfaces/interfaces/noticia.interface';
import {Observable} from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class NoticiaRestService extends PrincipalRestService<NoticiaInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'noticia';
  }

  obtenerNoticiasLike(
    datos,
  ): Observable<any> {
    return this._http.get(
      this.url +
      `:${this.port}/${
        this.segmento
      }/buscar-noticias-like?datos=${JSON.stringify(
        datos,
      )}`,
    );
  }
}