import {Component, Input, OnInit} from '@angular/core';
import {RentaFijaRondaRestService} from '../../../servicios/rest/servicios/renta-fija-ronda-rest.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-acciones-emisor-ronda',
  templateUrl: './acciones-emisor-ronda.component.html',
  styleUrls: ['./acciones-emisor-ronda.component.scss']
})
export class AccionesEmisorRondaComponent implements OnInit {
  @Input() esRentaFija: boolean;
  @Input() accionesORentaFija = [];
  @Input() idJuego: number;
  acciones = [];
  pathLogo = environment.url + ':' + environment.port + '/' + environment.pathLogosEmisores + '/';
  rentaFija;

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _rentaFijaRondaRestService: RentaFijaRondaRestService,
  ) {
  }

  ngOnInit() {
    if (this.esRentaFija) {
      this.rentaFija = 'Renta Fija';
      this.obtenerRentaFija();
    } else {
      this.accionesORentaFija
        .forEach(
          r => {
            this.acciones.push(r.emisor);
          });
    }
  }

  obtenerRentaFija() {
    const consultaRFRonda = {
      relations: ['rentaFijaEmisor', 'rentaFijaEmisor.emisor', 'rentaFijaEmisor.rentaFija'],
      where: {
        juego: this.idJuego,
        estado: 'E',
        habilitado: 1,
      },
    };
    this._rentaFijaRondaRestService
      .findAll(JSON.stringify(consultaRFRonda))
      .subscribe(
        rentaFija => {
          this.acciones = rentaFija[0]
            .map(
              (registro: any) => {
                registro.tipoRentaFija = registro.rentaFijaEmisor.rentaFija.tipoValor;
                registro.numeroRonda = +registro.rentaFijaEmisor.tiempo ? +registro.rentaFijaEmisor.tiempo : 0;
                registro.pathLogo = this.pathLogo + registro.rentaFijaEmisor.emisor.pathLogo;
                return registro;
              });
        }
      );
  }

}
