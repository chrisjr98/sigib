import { Injectable } from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {TipoNoticiaInterface} from '../../../interfaces/interfaces/tipo-noticia.interface';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoNoticiaRestService extends PrincipalRestService<TipoNoticiaInterface> {

  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'tipo-noticia';
  }
}
