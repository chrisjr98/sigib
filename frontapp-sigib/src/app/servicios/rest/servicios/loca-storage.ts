import {Inject, Injectable} from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { UsuarioSistemaInterface } from 'src/app/interfaces/interfaces/usuario-sistema';

@Injectable()
export class LocalStorageService {
  constructor(
    @Inject(LOCAL_STORAGE)
    // tslint:disable-next-line:variable-name
    private readonly _localStorage: StorageService
  ) {}

  public guardarEnLocalStorage(usuario: UsuarioSistemaInterface,idUsuario:number): void {
    const usuariosGuardados = this._localStorage.get(`${idUsuario}`) || [];
    usuariosGuardados.unshift(usuario);
    this._localStorage.set(`${idUsuario}`, usuariosGuardados);
    return this._localStorage.get(`${idUsuario}`);
  }

  public obtenerDatosLocalStorage(key: number): void {
    return this._localStorage.get(`${key}`);
  }
}
