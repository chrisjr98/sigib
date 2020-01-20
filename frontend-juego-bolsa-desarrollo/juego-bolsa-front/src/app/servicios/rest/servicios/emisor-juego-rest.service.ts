import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';
import {EmisorJuegoInterface} from '../../../interfaces/interfaces/emisor-juego.interface';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class EmisorJuegoRestService extends PrincipalRestService<EmisorJuegoInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'emisor-juego';
  }
}
