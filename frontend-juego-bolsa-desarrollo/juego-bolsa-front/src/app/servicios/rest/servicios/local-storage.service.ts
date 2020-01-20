import {Inject, Injectable} from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import {ParticipantePorSalaInterface} from '../../../interfaces/interfaces/participante-por-sala.interface';

@Injectable()
export class LocalStorageService {
  constructor(
    @Inject(LOCAL_STORAGE)
    // tslint:disable-next-line:variable-name
    private readonly _localStorage: StorageService
  ) {}

  public guardarEnLocalStorage(participante: ParticipantePorSalaInterface, idJuego: number): void {
    const participantesGuardados = this._localStorage.get(`${idJuego}`) || [];
    participantesGuardados.unshift(participante);
    this._localStorage.set(`${idJuego}`, participantesGuardados);
    return this._localStorage.get(`${idJuego}`);
  }

  public obtenerDatosLocalStorage(key: number): void {
    return this._localStorage.get(`${key}`);
  }
}
