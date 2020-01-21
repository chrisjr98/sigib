import {Component, Input, OnInit} from '@angular/core';
import {AUSPICIANTES, AUSPICIANTES_RONDA} from '../../../constantes/auspiciantes';
import {environment} from '../../../../environments/environment';
import {EmisorInterface} from '../../../interfaces/interfaces/emisor.interface';

@Component({
  selector: 'app-mostrar-auspiciantes-ronda',
  templateUrl: './mostrar-auspiciantes-ronda.component.html',
  styleUrls: ['./mostrar-auspiciantes-ronda.component.scss']
})
export class MostrarAuspiciantesRondaComponent implements OnInit {
  @Input() auspiciantes: EmisorInterface[];
  @Input() idsEmisoresGanan: Array<{idEmisor: number, valorAfecta: number}> = []
  @Input() idsEmisoresPierden: Array<{idEmisor: number, valorAfecta: number}> = [];
  // @Input() valorAfectaPositvo: number;
  // @Input() valorAfectaNegativo: number;
  arregloAuspiciantes = [];

  constructor() {
  }

  ngOnInit() {
    this.auspiciantes.forEach( auspiciante => {
      auspiciante.pathLogo = environment.url + ':' + environment.port + '/' + environment.pathLogosEmisores + '/' + auspiciante.pathLogo;
      this.arregloAuspiciantes.push(
        {
          cols: 1,
          rows: 1,
          auspiciante
        }
      );
    });
  }

  emisorGanoOPerdio(arregloIds: Array<{idEmisor: number, valorAfecta: number}>, emisor: EmisorInterface) {
    return arregloIds.find(objetoIdPrecio => {
      return objetoIdPrecio.idEmisor === emisor.id;
    });
  }
}
