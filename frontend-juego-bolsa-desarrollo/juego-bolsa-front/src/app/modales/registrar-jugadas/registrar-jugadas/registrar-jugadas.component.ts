import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output
} from '@angular/core';
import {EmisorJuegoRestService} from '../../../servicios/rest/servicios/emisor-juego-rest.service';
import {environment} from '../../../../environments/environment';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CargandoService} from '../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';
import {RutaJuegoSeleccionadoComponent} from '../../../modulos/jugador/rutas/ruta-juego-seleccionado/ruta-juego-seleccionado.component';
import {JugadaEmisorModal} from '../../../interfaces/interfaces/jugada-emisor-modal';
import {ParticipanteJuegoRestService} from '../../../servicios/rest/servicios/participante-juego-rest.service';
import {LocalStorageService} from '../../../servicios/rest/servicios/local-storage.service';
import {JuegoRestService} from '../../../servicios/rest/servicios/juego-rest.service';
import {RentaFijaRondaRestService} from '../../../servicios/rest/servicios/renta-fija-ronda-rest.service';
import {JugadaParticipanteRestService} from '../../../servicios/rest/servicios/jugada-participante-rest.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-registrar-jugadas',
  templateUrl: './registrar-jugadas.component.html',
  styleUrls: ['./registrar-jugadas.component.scss']
})
export class RegistrarJugadasComponent implements OnInit {
  arregloRF = [];
  arregloEmisorModal = [];
  arregloEmisoresPorJugada = [];
  arregloEmisorModalPrimeraMitad = [];
  arregloEmisorModalSegundaMitad = [];

  arregloEmisoresAGuardar = [];

  arregloJugadores = [];
  arregloJugadoresModal = [];

  idJugador;

  jugadorAcrearAdmin;

  mostrarPapelesRentaFija = false;
  mostrarSinDatos = false;
  mostrarAcciones = false;

  idRentaFijaRondaJuego;

  arreglo = [];
  arregloGuardar = [];
  jugadas;

  nombreJugadorSeleccionado = '';
  comproRentaVariable: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogo: MatDialogRef<RutaJuegoSeleccionadoComponent>,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    // tslint:disable-next-line:variable-name
    private readonly _emisorJuegoRestService: EmisorJuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _participanteJuego: ParticipanteJuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _localStorageService: LocalStorageService,
    // tslint:disable-next-line:variable-name
    private readonly _juegoRestService: JuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _rentaFijaRondaRestService: RentaFijaRondaRestService,
    // tslint:disable-next-line:variable-name
    private readonly _jugadaParticipanteRestService: JugadaParticipanteRestService,
    // tslint:disable-next-line: variable-name
    private readonly _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit() {
    console.log(this.data);
    this.comproRentaVariable = this.data.comproRentaVariable
      ? this.data.comproRentaVariable
      : false;
    this.obtenerEmisoresJugada();
    this.obtenerJugadoresJugada();
    this.obtenerRentaFija();
    this.verificarJugadaParticipante();
  }

  setearJugador(evento) {
    if (typeof evento === 'string') {
      this.nombreJugadorSeleccionado = evento;
    } else {
      this.jugadorAcrearAdmin = undefined;
      setTimeout(() => {
        this.jugadorAcrearAdmin = evento;
      }, 1);
    }
    this.mostrar('accion');
  }

  mostrar(nombre: 'rentaFija' | 'accion') {
    if (nombre === 'rentaFija' && !(this.data.nivel.toUpperCase() === 'PRINCIPIANTE')) {
      const existenRF = this.arregloRF.length > 0;
      if (existenRF) {
        this.mostrarAcciones = false;
        this.mostrarPapelesRentaFija = true;
      } else {
        this.mostrarSinDatos = true;
        this.mostrarAcciones = false;
        this.mostrarPapelesRentaFija = true;
      }
    }
    if (nombre === 'accion') {
      this.mostrarAcciones = true;
      this.mostrarPapelesRentaFija = false;
    }
  }

  obtenerJugadoresJugada() {
    const consulta = {
      where: {
        juego: this.data.juego
      },
      relations: ['participante']
    };
    this._participanteJuego
      .findAll(JSON.stringify(consulta))
      .subscribe(jugadoresJuego => {
        this.arregloJugadores = jugadoresJuego[0];
        this.arregloJugadoresModal = this.arregloJugadores.map(respuesta => {
          const jugador = {
            label: respuesta.participante.nombre,
            value: respuesta.participante.id
          };
          return jugador;
        });
      });
  }

  obtenerEmisoresJugada() {
    const consulta = {
      where: {
        juego: this.data.juego
      },
      relations: ['emisor']
    };
    this._emisorJuegoRestService
      .findAll(JSON.stringify(consulta))
      .subscribe(emisoresJuego => {
        this.arregloEmisoresPorJugada = emisoresJuego[0];
        const cantidadRegistrosMitad = Math.round(emisoresJuego[1] / 2);
        this.arregloEmisoresPorJugada.forEach((respuesta, indice) => {
          const emisorModal = {
            idRonda: this.data.idRonda,
            idParticipante: this.idJugador,
            idEmisorJuego: respuesta.id,
            idJuego: this.data.juego,
            tipoAccion: 0,
            cantidad: 0,
            emisorNombre: respuesta.emisor.nombre,
            path:
              environment.url +
              ':' +
              environment.port +
              '/' +
              environment.pathLogosEmisores +
              '/' +
              respuesta.emisor.pathLogo,
            idRentaFijaRonda: 0
          };
          this.arregloEmisorModal.push(emisorModal);
          if (indice >= cantidadRegistrosMitad) {
            this.arregloEmisorModalSegundaMitad.push(emisorModal);
          } else {
            this.arregloEmisorModalPrimeraMitad.push(emisorModal);
          }
        });
      });
  }

  setearValorComprarEmisor(valorCompra: number, emisor: JugadaEmisorModal) {
    if (this.data.esAdministrador === true) {
      this.idJugador = this.jugadorAcrearAdmin;
    } else {
      const registros = this._localStorageService.obtenerDatosLocalStorage(
        this.data.juego
      );
      this.idJugador = registros[0].idParticipante;
    }
    emisor.cantidad = valorCompra;
    emisor.tipoAccion = 3;
    emisor.idParticipante = this.idJugador;
    emisor.idRentaFijaRonda = this.idRentaFijaRondaJuego;

    this.buscarEmisor(emisor);
  }

  seteraValorVendeEmisor(valorVende: number, emisor: JugadaEmisorModal) {
    if (this.data.esAdministrador === true) {
      this.idJugador = this.jugadorAcrearAdmin;
    } else {
      const registros = this._localStorageService.obtenerDatosLocalStorage(
        this.data.juego
      );
      this.idJugador = registros[0].idParticipante;
    }
    emisor.cantidad = valorVende;
    emisor.tipoAccion = 2;
    emisor.idParticipante = this.idJugador;
    emisor.idRentaFijaRonda = this.idRentaFijaRondaJuego;
    this.buscarEmisor(emisor);
  }

  guardarEmisorJugada() {
    this.arregloEmisoresAGuardar = this.arregloEmisoresAGuardar.filter(
      emisor => emisor.cantidad
    );
    this._juegoRestService
      .registrarJugadasParticipante(this.arregloEmisoresAGuardar)
      .subscribe(
        jugadaRegistrada => {
          if (this.arregloRF.length > 0 && !(this.data.nivel.toUpperCase() === 'PRINCIPIANTE')) {
            this.mostrar('rentaFija');
          } else {
            this.dialogo.close();
          }
        },
        error => {
          console.error(error);
        }
      );
  }

  seGuardaronLosPapelesDeRentaFija() {
    if (this.data.esAdministrador === true) {
      this.idJugador = this.jugadorAcrearAdmin;
    } else {
      const registros = this._localStorageService.obtenerDatosLocalStorage(
        this.data.juego
      );
      this.idJugador = registros[0].idParticipante;
    }
    this.jugadas = this.arreglo.map(respuesta => {
      const probando = {
        cantidad: respuesta.cantidadAComprar,
        idRentaFijaRonda: respuesta.id,
        idEmisorJuego: respuesta.rentaFijaEmisor.emisor.id,
        idRonda: this.data.idRonda,
        idParticipante: this.idJugador,
        idJuego: this.data.juego,
        tipoAccion: 1
      };
      return probando;
    });

    this._juegoRestService.registrarJugadasParticipante(this.jugadas).subscribe(
      jugadaRegistrada => {
        this.dialogo.close();
      },
      error => {
        console.error(error);
      }
    );
  }

  mapearJugadasPapelesRentaFija(arregloPapelesRentaFijaPorRonda) {
    this.buscar(arregloPapelesRentaFijaPorRonda);
  }

  buscar(rentaFijaAbuscar) {
    const existeRentaFija = this.arreglo.some(
      rentaFija => rentaFija.id === rentaFijaAbuscar.id
    );
    if (existeRentaFija) {
      const indice = this.arreglo.indexOf(rentaFijaAbuscar);
      this.arreglo[indice] = rentaFijaAbuscar;
    } else {
      this.arreglo.push(rentaFijaAbuscar);
    }
  }

  buscarEmisor(emisorABuscar) {
    const existeEmisor = this.arregloEmisoresAGuardar.some(
      emisor => emisor.idEmisorJuego === emisorABuscar.idEmisorJuego
    );
    if (existeEmisor) {
      const indice = this.arregloEmisoresAGuardar.indexOf(emisorABuscar);
      this.arregloEmisoresAGuardar[indice] = emisorABuscar;
    } else {
      this.arregloEmisoresAGuardar.push(emisorABuscar);
    }
  }

  obtenerRentaFija() {
    const consultaRFRonda = {
      relations: [
        'rentaFijaEmisor',
        'rentaFijaEmisor.emisor',
        'rentaFijaEmisor.rentaFija'
      ],
      where: {
        juego: this.data.juego,
        estado: 'E',
        habilitado: 1,
        rondaNumero: +this.data.rondaActual
      }
    };
    this._rentaFijaRondaRestService
      .findAll(JSON.stringify(consultaRFRonda))
      .subscribe(r => {
        this.arregloRF = r[0].map((registro: any) => {
          // tslint:disable-next-line:max-line-length
          registro.rentaFijaEmisor.emisor.pathLogo =
            environment.url +
            ':' +
            environment.port +
            '/' +
            environment.pathLogosEmisores +
            '/' +
            registro.rentaFijaEmisor.emisor.pathLogo;
          return registro;
        });
      });
  }

  verificarJugadaParticipante() {
    if (!this.data.esAdministrador) {
      const registros = this._localStorageService.obtenerDatosLocalStorage(
        this.data.juego
      );
      this.idJugador = registros[0].idParticipante;
      const consultaJugadaParticipantes = {
        ronda: this.data.idRonda,
        participante: this.idJugador,
        juego: this.data.juego
      };
      this._jugadaParticipanteRestService
        .verificarJugadaParticipante(consultaJugadaParticipantes)
        .subscribe(jugadaParticipantes => {
          if (jugadaParticipantes[1] > 0) {
            this.comproRentaVariable = true;
          } else {
            this.comproRentaVariable = false;
          }
        });
    }
  }
}
