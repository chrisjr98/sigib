import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class RentaFijaRondaRestService extends PrincipalRestService<RentaFijaRondaRestService> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'rentafija-ronda';
  }

  consultarRentaFija(datos) {
    const url = this.url + ':' + this.port + '/' + this.segmento + '/' + 'emitir-renta-fija?rentaFija=' + JSON.stringify(datos);
    const respuesta = this._http.get(url);
    return respuesta;
  }

}
