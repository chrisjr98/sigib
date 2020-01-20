import {Injectable} from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {RentaFijaEmisorInterface} from '../../../interfaces/interfaces/renta-fija-emisor.interface';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class RentaFijaEmisorRestService extends PrincipalRestService<RentaFijaEmisorInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'renta-fija-emisor';
  }
}
