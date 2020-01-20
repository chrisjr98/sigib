import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {EmisorRestService} from '../../../servicios/rest/servicios/emisor-rest.service';
import {EmisorInterface} from '../../../interfaces/interfaces/emisor.interface';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-mostrar-auspiciantes',
  templateUrl: './mostrar-auspiciantes.component.html',
  styleUrls: ['./mostrar-auspiciantes.component.scss']
})
export class MostrarAuspiciantesComponent implements OnInit {

  arregloAuspiciantes = [];
  mostrar = true;

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _emisorRestSrevice: EmisorRestService,
  ) { }

  ngOnInit() {
    this._emisorRestSrevice.findAll()
      .subscribe( (respuesta: [EmisorInterface [], number]) => {
        respuesta[0].forEach( auspiciante => {
          // tslint:disable-next-line:max-line-length
          auspiciante.pathLogo = environment.url + ':' + environment.port + '/' + environment.pathLogosEmisores + '/' + auspiciante.pathLogo;
          this.arregloAuspiciantes.push(
            {
              cols: 1,
              rows: 1,
              auspiciante
            }
          );
        });
      }, error => {
        console.error(error);
      });
    // this.mostrarAuspiciantes();
  }

  mostrarAuspiciantes() {
    setTimeout(() => {
      this.mostrar = false;
      this._router.navigate(['../jugador', 'juego-administrador']);
    }, 3000);
  }

}
