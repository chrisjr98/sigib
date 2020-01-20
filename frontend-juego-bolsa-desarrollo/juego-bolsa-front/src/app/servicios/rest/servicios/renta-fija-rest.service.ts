import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';
import {RentaFijaInterface} from '../../../interfaces/interfaces/renta-fija.interface';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class RentaFijaRestService extends PrincipalRestService<RentaFijaInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'renta-fija';
  }
}
