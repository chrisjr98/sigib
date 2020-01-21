import {Component, OnInit} from '@angular/core';
import {MostrarListaAuspiciantesService} from '../../../servicios/mostrar-lista-auspiciantes/mostrar-lista-auspiciantes.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment.prod';

declare var user_id;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  estaLogeado: boolean;
  urlSalir = `${environment.url}:${environment.port}/logout`;


  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _mostrarListaAuspiciantes: MostrarListaAuspiciantesService,
    public readonly router: Router,
  ) {
    this.estaLogeado = false;
  }

  ngOnInit() {
  }

  desactivarAuspiciantes() {
    this._mostrarListaAuspiciantes.ocultar();
  }

  salir() {
    window.location.href = this.urlSalir;
  }

}
