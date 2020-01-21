import { Component, OnInit } from '@angular/core';
import {OPCIONES_MENU_ADMINISTRADOR} from '../../../constantes/opciones-menu-administrador';

@Component({
  selector: 'app-menu-opciones-administrador',
  templateUrl: './menu-opciones-administrador.component.html',
  styleUrls: ['./menu-opciones-administrador.component.scss']
})
export class MenuOpcionesAdministradorComponent implements OnInit {

  opcionesMenuAdministrador = OPCIONES_MENU_ADMINISTRADOR;
  constructor() { }

  ngOnInit() {
  }

}
