import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';
import {AccionesParticipanteInterface} from '../../../interfaces/interfaces/acciones-participante.interface';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AccionesParticipanteRestService extends PrincipalRestService<AccionesParticipanteInterface> {
  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'acciones-participante';
  }
}
