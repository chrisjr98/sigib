import { Component, OnInit } from '@angular/core';
import {AUSPICIANTES} from '../../../constantes/auspiciantes';
import {EmisorRestService} from '../../../servicios/rest/servicios/emisor-rest.service';
import {EmisorInterface} from '../../../interfaces/interfaces/emisor.interface';
import {ToasterService} from 'angular2-toaster';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-slider-auspiciantes',
  templateUrl: './slider-auspiciantes.component.html',
  styleUrls: ['./slider-auspiciantes.component.scss']
})
export class SliderAuspiciantesComponent implements OnInit {
  auspiciantes = [];
  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _emisoresRestService: EmisorRestService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
  ) { }

  ngOnInit() {
    const consultaEmisores = {
      habillitado: 1
    };
    this._emisoresRestService.findAll(JSON.stringify(consultaEmisores))
      .subscribe( (respuesta: [EmisorInterface[], number]) => {
        this.auspiciantes = respuesta[0].map( auspiciante => {
          return {
            source: environment.url + ':' + environment.port + '/' + environment.pathLogosEmisores + '/' + auspiciante.pathLogo,
            alt: auspiciante.nombre,
            title: auspiciante.nombre,
            width: 500,
            height: 300,
          };
        });
      }, error => {
        console.error(error);
        this._toasterService.pop('error', 'Error', 'Error al cargar los auspiciantes');
      });
  }
}
