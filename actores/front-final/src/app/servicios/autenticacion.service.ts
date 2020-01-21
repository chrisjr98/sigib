import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/index';
import * as moment from 'moment';

@Injectable()
export class AutenticacionService {

  constructor(private readonly _httpClient: HttpClient,
              private readonly _router: Router) {}

  estaLogeado = false;
  usuarioLogeado: any;

  login(correo, password, callbackError) {
    this._httpClient.post(environment.urlBackEnd + '/autenticacion/logear',
      {
        correo,
        password
      })
      .subscribe((usuario) => {
        console.log(usuario);
        this.estaLogeado = true;
        this.usuarioLogeado = usuario;
        this.usuarioLogeado.horaLogin = moment().format('LT');
        this._router.navigate(['/aplicacion', 'inicio']);
      }, (error1) => {
        console.error(error1);
        callbackError(error1);
      });
  }

  obtenerUsuarioLogeado() {
    return this.usuarioLogeado;
  }

  estadoLogin(): boolean {
    return this.estaLogeado;
  }

  obtenerRolUsuario(): string {
   return this.usuarioLogeado.rol;
  }

  existeUsuario(correo: string): Observable<any> {
    return this._httpClient.post(environment.urlBackEnd + '/autenticacion/existeCorreo', {
      correo
    });
  }

  resetPassword(correo: string): Observable<any> {
    return this._httpClient.post( environment.urlBackEnd + '/usuario/resetear-password', {
      correo
    });
  }
}
