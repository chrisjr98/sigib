import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';
import {NoticiaEmisorInterface} from '../../../interfaces/interfaces/noticia-emisor.interface';
import {Observable} from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class NoticiaEmisorRestService extends PrincipalRestService<NoticiaEmisorInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'noticia-emisor';
  }
  obtenerNoticiaEmisorTitulo(datos: any): Observable<any> {
    return this._http.get(
      this.url +
      `:${this.port}/${this.segmento}/buscar-noticias-emisor-titulo?datos=${JSON.stringify(
        datos,
      )}`,
    );
  }
  obtenerNoticiaEmisorTipo(datos: any): Observable<any> {
    return this._http.get(
      this.url +
      `:${this.port}/${this.segmento}/buscar-noticias-emisor-tipo?datos=${JSON.stringify(
        datos,
      )}`,
    );
  }
  obtenerNoticiaEmisorNivel(datos: any): Observable<any> {
    return this._http.get(
      this.url +
      `:${this.port}/${this.segmento}/buscar-noticias-emisor-nivel?datos=${JSON.stringify(
        datos,
      )}`,
    );
  }

  obtenerAsignacionNoticias(datos: any): Observable<any> {
    return this._http.get(
      this.url +
      `:${this.port}/${this.segmento}/obtener-asignacion-noticias?datos=${JSON.stringify(
        datos,
      )}`,
    );
  }

}
