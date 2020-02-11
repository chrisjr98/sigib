import {Component, Input, OnInit} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToasterService} from 'angular2-toaster';

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
    const url = ['/administrador', 'menu'];
    this._router
      .navigate(
        url,
        {
          queryParams:this.datosUsuario
        });
  }

  verificarParticipanteIngreso() {

  }

  buscarRondaPorJuego(nombreSala: string) {
}
}
