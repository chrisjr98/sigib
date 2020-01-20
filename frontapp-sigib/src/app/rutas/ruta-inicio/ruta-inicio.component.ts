import {Component, OnInit} from '@angular/core';
import {DATOS_LISTA_JUEGOS, DATOS_VALORES_ACCIONES_AUSPICIANTES} from '../../constantes/opciones-menu-inicio';
import {AUSPICIANTES} from '../../constantes/auspiciantes';

@Component({
  selector: 'app-ruta-inicio',
  templateUrl: './ruta-inicio.component.html',
  styleUrls: ['./ruta-inicio.component.scss']
})
export class RutaInicioComponent implements OnInit {
  datos = AUSPICIANTES;

  constructor(
    // tslint:disable-next-line:variable-name
  ) {
  }

  ngOnInit() {
  }

}
