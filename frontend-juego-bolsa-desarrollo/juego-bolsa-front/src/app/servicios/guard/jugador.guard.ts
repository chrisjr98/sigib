import {Injectable} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {CanActivate} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import {JuegoRestService} from '../rest/servicios/juego-rest.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

declare var window;

@Injectable()
export class JugadorGuard implements CanActivate {

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    // tslint:disable-next-line:variable-name
    private readonly _juegoRestService: JuegoRestService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const idJuego = route.params.idJuego;
    const respuesta = window.prompt('Ingrese clave');
    return this._juegoRestService
      .findOne(idJuego)
      .pipe(
        map(
          (resp) => {
            if ( resp.passwordRonda === respuesta ) {
            }
            return false;
          }
        )
      );
  }


}
