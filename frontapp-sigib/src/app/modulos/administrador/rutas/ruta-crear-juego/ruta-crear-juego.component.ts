import {Component, OnInit} from '@angular/core';
import {JuegoRestService} from '../../../../servicios/rest/servicios/juego-rest.service';
import {Router} from '@angular/router';
import {SocketJuegoService} from '../../../../servicios/rest/servicios/socket-juego-rest.service';
import {EmisorJuegoRestService} from '../../../../servicios/rest/servicios/emisor-juego-rest.service';
import {EmisorRestService} from '../../../../servicios/rest/servicios/emisor-rest.service';
import {ToasterService} from 'angular2-toaster';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';

@Component({
  selector: 'app-ruta-crear-juego',
  templateUrl: './ruta-crear-juego.component.html',
  styleUrls: ['./ruta-crear-juego.component.scss']
})
export class RutaCrearJuegoComponent implements OnInit {

  datosJuego;

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly  _juegoRestService: JuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly  _emisorJuegoRestService: EmisorJuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly  _emisorRestService: EmisorRestService,
    // tslint:disable-next-line:variable-name
    private readonly _socketJuegoService: SocketJuegoService,
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    // tslint:disable-next-line:variable-name
    private readonly _cargadoService: CargandoService,
  ) {
  }

  ngOnInit() {
    this._socketJuegoService
      .eventoConectado
      .subscribe((r) => {
      }, error => {
        console.error(error);
      });
  }

  formularioValido(evento) {
    this.datosJuego = evento;
  }

  async crearJuego() {
    this._cargadoService.habilitarCargando();
    const crearJuego = {
      tiempoRonda: this.datosJuego.tiempoDeRonda,
      numeroRondas: this.datosJuego.numeroDeRondas,
      passwordRonda: this.datosJuego.password,
      nombreSala: '',
      nombreJuego: this.datosJuego.nombre,
      split: false,
      splitJugado: false,
      contraSplit: false,
      contraSplitJugado: false,
      boom: false,
      boomJugado: false,
      crush: false,
      crushJugado: false,
      estado: 'I',
      nivelJuego: this.datosJuego.dificultad,
      mostrarAyuda: false
    };
    await this._juegoRestService
      .crearJuego(crearJuego)
      .subscribe(
        async (r: any) => {
          if (!r.mensaje) {
            const rutaAjustes = ['../administrador', 'menu', 'juegos', 'listar-jugadores', `${r.id}`];
            this._router.navigate(rutaAjustes);
          } else {
            this._toasterService.pop('warning', 'Warning', 'Se necesita al menos 4 emisores que vendad acciones');
          }
          this._cargadoService.deshabilitarCargando();
        },
        error => {
          console.error({
            error,
            mensaje: 'Error al crear juego'
          });
          this._toasterService.pop('error', 'Error', 'Error al traer las noticias por ronda');
          this._cargadoService.deshabilitarCargando();
        });
  }
}
