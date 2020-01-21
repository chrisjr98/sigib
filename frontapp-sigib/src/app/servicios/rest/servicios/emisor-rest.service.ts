import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';
import {EmisorInterface} from '../../../interfaces/interfaces/emisor.interface';
import {Observable} from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class EmisorRestService extends PrincipalRestService<EmisorInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'emisor';
  }
  guardarEmisor(emisor: EmisorInterface, logo: File, idEmisor?: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append(`logo-emisor`,  logo);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const options = { headers };
    delete emisor.archivoLogo;
    const datosEmisor = {
      emisor,
      idEmisor
    };
    return this._http.post(
      `${this.url}:${this.port}/${this.segmento}/guardar-emisor?emisor=${JSON.stringify(datosEmisor)}`,
      formData,
      options,
    );
  }

  obtenerEmisoresLike(
    datos,
  ): Observable<any> {
    return this._http.get(
      this.url +
      `:${this.port}/${
        this.segmento
      }/buscar-emisores-like?datos=${JSON.stringify(
        datos,
      )}`,
    );
  }
}
