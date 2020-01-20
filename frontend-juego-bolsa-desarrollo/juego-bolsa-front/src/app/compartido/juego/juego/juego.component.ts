import {Component, Input, OnInit} from '@angular/core';
import {JuegoInterface} from '../../../interfaces/interfaces/juego.interface';
import {JuegoRestService} from '../../../servicios/rest/servicios/juego-rest.service';
import {CargandoService} from '../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../servicios/rest/servicios/local-storage.service';
import {RondaRestService} from '../../../servicios/rest/servicios/ronda-rest.service';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.scss']
})
export class JuegoComponent implements OnInit {

  @Input() juego: JuegoInterface;
  @Input() mostrarAdmin = false;
  @Input() nombreJuego: string;
  @Input() estado: string;
  @Input() totalParticipantes: number;
  @Input() pathImagen: string;

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _juegoRestService: JuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _localStorageService: LocalStorageService,
    // tslint:disable-next-line:variable-name
    private readonly _rondaRestService: RondaRestService,
  ) {
  }

  ngOnInit() {
  }

  cambiarHabilitado(juego: JuegoInterface, habilitado: number) {
    this._cargandoService.habilitarCargando();
    this._juegoRestService
      .updateOne(
        juego.id,
        {
          habilitado: habilitado === 0 ? 1 : 0,
        }
      )
      .subscribe(
        (data) => {
          this._cargandoService.deshabilitarCargando();
          juego.habilitado = habilitado === 0 ? 1 : 0;
        },
        (error) => {
          this._cargandoService.deshabilitarCargando();
          console.error({
            error,
            mensaje: 'Error actualizando habilitado juego',
          });
          this._toasterService.pop(
            'error',
            'Error',
            'Error del servidor, intentálo más tarde.'
          );
        }
      );
  }

  irARuta(juego: JuegoInterface) {
    if (this.mostrarAdmin) {
      if (juego.estado === 'I') {
        const url = ['/administrador', 'menu', 'juegos', 'listar-jugadores', juego.id];
        this._router.navigate(url);
      } else {
        const url = ['/administrador', 'menu', 'juegos', 'juego-seleccionado', juego.id];
        const consultaRonda = {
          where: {
            juego: juego.id,
          }
        };
        this._rondaRestService
          .findAll(JSON.stringify(consultaRonda))
          .subscribe(
            rondasJuego => {
              const rondaActual = rondasJuego[0][rondasJuego[1] - 1];
              this._router
                .navigate(
                  url,
                  {
                    queryParams: {
                      ronda: rondaActual.numeroRonda,
                      idRonda: rondaActual.id,
                      empezarRonda: rondaActual.estado === 'C' ? true : false,
                      caja: rondaActual.estado === 'C' ? false : true,
                      mostrarNoticias: rondaActual.estado === 'C' ? false : true,
                      opcionesRonda: rondaActual.estado === 'C' ? false : true,
                    }
                  }
                );
            }
          );
      }
    } else {
      const registros = this._localStorageService
        .obtenerDatosLocalStorage(juego.id) as any;
      if (juego.estado === 'I' && registros) {
        const url = [
          '/jugador',
          'ingresar-juego',
          juego.id
        ];
        this._router.navigate(url, {
          queryParams: {
            ronda: 0,
            idRonda: 0,
            caja: false,
            empezarRonda: true,
            mostrarNoticias: false,
            opcionesRonda: false,
          }
        });
      } else {
        if (registros) {
          const url = [
            '/jugador',
            'juego-seleccionado',
            juego.id
          ];
          this._router.navigate(url, {
            queryParams: {
              ronda: 0,
              idRonda: 0,
              caja: false,
              empezarRonda: true,
              mostrarNoticias: false,
              opcionesRonda: false,
            }
          });
        }
      }
    }

  }
}
