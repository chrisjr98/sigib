import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {PrincipalRestService} from '../rest-principal.service';
import {environment} from '../../../../environments/environment';
import {ParticipanteInterface} from '../../../interfaces/interfaces/participante.interface';
import io from 'socket.io-client';
import {from} from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ParticipanteRestService extends PrincipalRestService<ParticipanteInterface> {

  socketBolsa = io(environment.socket);

  constructor(
    // tslint:disable-next-line:variable-name
    public readonly _http: HttpClient,
  ) {
    // @ts-ignore
    super(_http);
    this.url = environment.url;
    this.port = environment.port;
    this.segmento = 'participante';
  }

  agregarParticipante(datos) {
    return new Promise(
      (resolve, reject) => {
        this.socketBolsa
          .emit('agregarParticipante', datos, (salaCreada) => {
            resolve(salaCreada);
          });
      }
    );
  }
}
