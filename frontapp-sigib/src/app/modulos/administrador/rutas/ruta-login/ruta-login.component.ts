import {Component, Input, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';
import { LocalStorageService } from 'src/app/servicios/rest/servicios/local-storage';

@Component({
  selector: 'app-ingresar-juego',
  templateUrl: './ruta-login.component.html',
  styleUrls: ['./ruta-login.component.scss']
})
export class RutaLoginComponent implements OnInit {

  datosUsuario;


  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _cookieService: CookieService,
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    private readonly _localStorageService: LocalStorageService,

  ) {
  }

  ngOnInit() {
  }

  unirseARoom(participante) {

  }
  formularioValido(evento) {
    this.datosUsuario = evento;
    console.log('usuario', this.datosUsuario);
  }

  irARutaMenu(registroValido) {
    if(this.datosUsuario){
      const datosLocalStorage = {
        cedulaUsuario: this.datosUsuario.cedula,
        rol: this.datosUsuario.rol
      };
      this._localStorageService
        .guardarEnLocalStorage(
          datosLocalStorage,
          this.datosUsuario.cedula,
        );
      const url = ['/administrador', 'menu'];
      this._router
      .navigate(
        url,
        {
          queryParams:{
            cedula: this.datosUsuario.cedula,
            rol: this.datosUsuario.rol
          }
        });
      }

  }

  verificarParticipanteIngreso() {

  }

  buscarRondaPorJuego(nombreSala: string) {
}
}
