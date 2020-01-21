import {Component, OnInit} from '@angular/core';
import {DATOS_LISTA_JUEGOS, DATOS_VALORES_ACCIONES_AUSPICIANTES} from '../../constantes/opciones-menu-inicio';
import {AUSPICIANTES} from '../../constantes/auspiciantes';
import {MostrarListaAuspiciantesService} from '../../servicios/mostrar-lista-auspiciantes/mostrar-lista-auspiciantes.service';

@Component({
  selector: 'app-ruta-inicio',
  templateUrl: './ruta-inicio.component.html',
  styleUrls: ['./ruta-inicio.component.scss']
})
export class RutaInicioComponent implements OnInit {
  datos = AUSPICIANTES;

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _mostrarListaAuspiciantes: MostrarListaAuspiciantesService,
  ) {
  }

  ngOnInit() {
    this._mostrarListaAuspiciantes.ocultar();
  }

}
