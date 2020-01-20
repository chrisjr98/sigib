import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';
import {ConfiguracionesInterface} from '../../../interfaces/interfaces/configuraciones.interface';
import {map} from 'rxjs/operators';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ConfiguracionesRestService extends PrincipalRestService<ConfiguracionesInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'configuraciones';
  }

  buscarNivelPorNombre(criterioBusqueda) {
    const url = this.url + ':' + this.port + '/' + this.segmento + '/buscar-nivel-nombre' + `?criterioBusqueda=${criterioBusqueda}`;
    const cabecerasDePeticion = {};
    return this._http
      .get(url, cabecerasDePeticion)
      .pipe(
        // tslint:disable-next-line:no-angle-bracket-type-assertion
        map((r: any) => { const respuesta: [ConfiguracionesInterface[], number] = r; return respuesta; })
      );
  }
}
