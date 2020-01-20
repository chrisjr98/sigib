import {Component, Inject, Input, OnInit} from '@angular/core';
import {ToasterService} from 'angular2-toaster';
import {ParticipanteJuegoRestService} from '../../../servicios/rest/servicios/participante-juego-rest.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {JuegoInterface} from '../../../interfaces/interfaces/juego.interface';
import {SocketJuegoService} from '../../../servicios/rest/servicios/socket-juego-rest.service';
import {LocalStorageService} from '../../../servicios/rest/servicios/local-storage.service';
import {ParticipanteJuegoInterface} from '../../../interfaces/interfaces/participante-juego.interface';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-ranking-jugadores',
  templateUrl: './ranking-jugadores.component.html',
  styleUrls: ['./ranking-jugadores.component.scss']
})
export class RankingJugadoresComponent implements OnInit {
  rankingJugadores = [];
  rakingJugadoresJugador = [];
  columnasAcciones = [
    {field: 'emisor', header: 'Empresa'},
    {field: 'cantidad', header: 'Cantidad'},
    {field: 'precio', header: 'Precio'},
    {field: 'valor', header: 'Valor'},
  ];
  columnasRenta = [
    {field: 'emisor', header: 'Empresa'},
    {field: 'cantidad', header: 'Cantidad'},
    {field: 'precio', header: 'Precio'},
    {field: 'valor', header: 'Valor'},
    {field: 'estado', header: 'Estado'},
  ];
  constructor(
    public dialogo: MatDialogRef<RankingJugadoresComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { juego: JuegoInterface, esAdministrador: any, rakingJugadores: any },
    // tslint:disable-next-line:variable-name
    private readonly _participanteJuegoRestSevice: ParticipanteJuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    // tslint:disable-next-line:variable-name
    private readonly _socketJuegoService: SocketJuegoService,
    // tslint:disable-next-line:variable-name
    private readonly  _localStorageService: LocalStorageService,
  ) {
  }

  ngOnInit() {
    if (this.data.esAdministrador) {
      this.encontrarParticipantesAdmin();
    } else {
      this.encontrarParticipante();
    }
  }


  encontrarParticipantesAdmin() {
    const consultaJugadores = {
      where: {
        juego: this.data.juego.id,
      },
      // tslint:disable-next-line:max-line-length
      relations: ['participante', 'accionesParticipante', 'accionesParticipante.emisorJuego', 'accionesParticipante.emisorJuego.emisor', 'jugadasParticipante', 'jugadasParticipante.ronda', 'jugadasParticipante.ronda.rentafijaRondas', 'jugadasParticipante.ronda.rentafijaRondas.rentaFijaEmisor', 'jugadasParticipante.ronda.rentafijaRondas.rentaFijaEmisor.emisor']
    };
    this._participanteJuegoRestSevice.findAll(JSON.stringify(consultaJugadores))
      .subscribe((respuesta: [any[], number]) => {
        this.rankingJugadores = respuesta[0].sort((a, b) => {
          if (+a.dineroActual > +b.dineroActual) {
            return -1;
          }
          if (+a.dineroActual < +b.dineroActual) {
            return 1;
          }
          return 0;
        });
        this._socketJuegoService
          .terminarJuego(
            this.rankingJugadores,
            this.data.juego,
          );
        this.cargarParticpantes(this.rankingJugadores);
      }, error => {
        console.error(error);
        this._toasterService.pop('error', 'Error', 'Error al cargar los participantes de juego');
      });
  }

  encontrarParticipante() {

    const registros = this._localStorageService.obtenerDatosLocalStorage(this.data.juego.id);
    const idJugador = registros[0].idParticipante;

    this.rakingJugadoresJugador = this.data.rakingJugadores as Array<any>;
    const jugadorFilter = this.rakingJugadoresJugador
      .filter(
        jugada => {
          return jugada.participante.id === idJugador;
        }
      );

    const arregloIndices = this.rakingJugadoresJugador.map((elemento, indiceElemento) => {
      if (elemento.participante.id === idJugador) {
        return indiceElemento;
      }
    }).filter(elemento2 => {
      return elemento2 !== undefined;
    });
    this.cargarParticpantesJugador(jugadorFilter, arregloIndices[0]);
  }


  cargarParticpantes(posiciones) {

    this.rankingJugadores = posiciones.map((jugador, index) => {
      switch (index) {
        case 0:
          let totalAccionesPrimero = 0;
          for (const accionEmisor of jugador.accionesParticipante) {
            totalAccionesPrimero = +totalAccionesPrimero + (+accionEmisor.cantidad * +accionEmisor.emisorJuego.precioActual);
            totalAccionesPrimero = +totalAccionesPrimero.toFixed(2);
          }
          const jugadasRentaPrimer = jugador.jugadasParticipante.map(
            jugadaRentaFija => {
              if (jugadaRentaFija.idRentaFijaRonda) {
                return {
                  rentaEmisor: jugadaRentaFija.ronda.rentafijaRondas[0].rentaFijaEmisor.emisor.nombre,
                  rentaCantidad: +jugadaRentaFija.cantidad,
                  rentaPrecio: +jugadaRentaFija.ronda.rentafijaRondas[0].precio,
                  rentaValor: (+jugadaRentaFija.cantidad * +jugadaRentaFija.ronda.rentafijaRondas[0].precio),
                  rentaEstado: jugadaRentaFija.ronda.rentafijaRondas[0].estado === 'I' ? 'Pagado' : 'Espera',
                };
              }
            }
          ).filter( valor => {
            if (valor) {
              return valor;
            }
          });
          return {
            source: 'assets/imagenes/trofeos/primer.png',
            dineroActual: jugador.dineroActual,
            nombre: jugador.participante.nombre,
            width: 200,
            height: 100,
            subtotal: +totalAccionesPrimero,
            total: +totalAccionesPrimero + +jugador.dineroActual,
            acciones: jugador.accionesParticipante,
            rentaFija: jugadasRentaPrimer,
            indice: index,
          };
        case 1:
          let totalAccionesSefundo = 0;
          for (const accionEmisor of jugador.accionesParticipante) {
            totalAccionesSefundo = +totalAccionesSefundo + (+accionEmisor.cantidad * +accionEmisor.emisorJuego.precioActual);
            totalAccionesSefundo = +totalAccionesSefundo.toFixed(2);
          }
          const jugadasRentaSegundo = jugador.jugadasParticipante.map(
            jugadaRentaFija => {
              if (jugadaRentaFija.idRentaFijaRonda) {
                return {
                  rentaEmisor: jugadaRentaFija.ronda.rentafijaRondas[0].rentaFijaEmisor.emisor.nombre,
                  rentaCantidad: +jugadaRentaFija.cantidad,
                  rentaPrecio: +jugadaRentaFija.ronda.rentafijaRondas[0].precio,
                  rentaValor: (+jugadaRentaFija.cantidad * +jugadaRentaFija.ronda.rentafijaRondas[0].precio),
                  rentaEstado: jugadaRentaFija.ronda.rentafijaRondas[0].estado === 'I' ? 'Pagado' : 'Espera',
                };
              }
            }
          ).filter( valor => {
            if (valor) {
              return valor;
            }
          });
          return {
            source: 'assets/imagenes/trofeos/segundo.png',
            dineroActual: jugador.dineroActual,
            nombre: jugador.participante.nombre,
            width: 200,
            height: 100,
            subtotal: +totalAccionesSefundo,
            total: +totalAccionesSefundo + +jugador.dineroActual,
            acciones: jugador.accionesParticipante,
            rentaFija: jugadasRentaSegundo,
            indice: index,
          };
        case 2:
          let totalAccionesSterce = 0;
          for (const accionEmisor of jugador.accionesParticipante) {
            totalAccionesSterce = +totalAccionesSterce + (+accionEmisor.cantidad * +accionEmisor.emisorJuego.precioActual);
            totalAccionesSterce = +totalAccionesSterce.toFixed(2);
          }
          const jugadasRentaTercer = jugador.jugadasParticipante.map(
            jugadaRentaFija => {
              if (jugadaRentaFija.idRentaFijaRonda) {
                return {
                  rentaEmisor: jugadaRentaFija.ronda.rentafijaRondas[0].rentaFijaEmisor.emisor.nombre,
                  rentaCantidad: +jugadaRentaFija.cantidad,
                  rentaPrecio: +jugadaRentaFija.ronda.rentafijaRondas[0].precio,
                  rentaValor: (+jugadaRentaFija.cantidad * +jugadaRentaFija.ronda.rentafijaRondas[0].precio),
                  rentaEstado: jugadaRentaFija.ronda.rentafijaRondas[0].estado === 'I' ? 'Pagado' : 'Espera',
                };
              }
            }
          ).filter( valor => {
            if (valor) {
              return valor;
            }
          });
          return {
            source: 'assets/imagenes/trofeos/tercer.png',
            dineroActual: jugador.dineroActual,
            nombre: jugador.participante.nombre,
            width: 200,
            height: 100,
            subtotal: +totalAccionesSterce,
            total: +totalAccionesSterce + +jugador.dineroActual,
            acciones: jugador.accionesParticipante,
            rentaFija: jugadasRentaTercer,
            indice: index,

          };
        default:
          let totalAcciones = 0;
          for (const accionEmisor of jugador.accionesParticipante) {
            totalAcciones = +totalAcciones + (+accionEmisor.cantidad * +accionEmisor.emisorJuego.precioActual);
            totalAcciones = +totalAcciones.toFixed(2);
          }
          const jugadasRenta = jugador.jugadasParticipante.map(
            jugadaRentaFija => {
              if (jugadaRentaFija.idRentaFijaRonda) {
                return {
                  rentaEmisor: jugadaRentaFija.ronda.rentafijaRondas[0].rentaFijaEmisor.emisor.nombre,
                  rentaCantidad: +jugadaRentaFija.cantidad,
                  rentaPrecio: +jugadaRentaFija.ronda.rentafijaRondas[0].precio,
                  rentaValor: (+jugadaRentaFija.cantidad * +jugadaRentaFija.ronda.rentafijaRondas[0].precio),
                  rentaEstado: jugadaRentaFija.ronda.rentafijaRondas[0].estado === 'I' ? 'Pagado' : 'Espera',
                };
              }
            }
          ).filter( valor => {
            if (valor) {
              return valor;
            }
          });
          return {
            source: 'assets/imagenes/trofeos/uio.png',
            dineroActual: jugador.dineroActual,
            nombre: jugador.participante.nombre,
            width: 200,
            height: 100,
            subtotal: +totalAcciones,
            total: +totalAcciones + +jugador.dineroActual,
            acciones: jugador.accionesParticipante,
            rentaFija: jugadasRenta,
            indice: index,

          };
      }
    }).sort((a, b) => {
      if (+a.total > +b.total) {
        return 1;
      }
      if (+a.total <= +b.total) {
        return -1;
      }
    });
  }

  cargarParticpantesJugador(posiciones, index) {

    this.rakingJugadoresJugador = posiciones.map(jugador => {
      switch (index) {
        case 0:
          let totalAccionesPrimero = 0;
          for (const accionEmisor of jugador.accionesParticipante) {
            totalAccionesPrimero = +totalAccionesPrimero + (+accionEmisor.cantidad * +accionEmisor.emisorJuego.precioActual);
            totalAccionesPrimero = +totalAccionesPrimero.toFixed(2);
          }
          const jugadasRentaPrimer = jugador.jugadasParticipante.map(
            jugadaRentaFija => {
              if (jugadaRentaFija.idRentaFijaRonda) {
                return {
                  rentaEmisor: jugadaRentaFija.ronda.rentafijaRondas[0].rentaFijaEmisor.emisor.nombre,
                  rentaCantidad: +jugadaRentaFija.cantidad,
                  rentaPrecio: +jugadaRentaFija.ronda.rentafijaRondas[0].precio,
                  rentaValor: (+jugadaRentaFija.cantidad * +jugadaRentaFija.ronda.rentafijaRondas[0].precio),
                  rentaEstado: jugadaRentaFija.ronda.rentafijaRondas[0].estado === 'I' ? 'Pagado' : 'Espera',
                };
              }
            }
          ).filter( valor => {
            if (valor) {
              return valor;
            }
          });
          return {
            source: 'assets/imagenes/trofeos/primer.png',
            dineroActual: jugador.dineroActual,
            nombre: jugador.participante.nombre,
            width: 200,
            height: 100,
            subtotal: +totalAccionesPrimero,
            total: +totalAccionesPrimero + +jugador.dineroActual,
            acciones: jugador.accionesParticipante,
            rentaFija: jugadasRentaPrimer,
            indice: index,
          };
        case 1:
          let totalAccionesSefundo = 0;
          for (const accionEmisor of jugador.accionesParticipante) {
            totalAccionesSefundo = +totalAccionesSefundo + (+accionEmisor.cantidad * +accionEmisor.emisorJuego.precioActual);
            totalAccionesSefundo = +totalAccionesSefundo.toFixed(2);
          }
          const jugadasRentaSegundo = jugador.jugadasParticipante.map(
            jugadaRentaFija => {
              if (jugadaRentaFija.idRentaFijaRonda) {
                return {
                  rentaEmisor: jugadaRentaFija.ronda.rentafijaRondas[0].rentaFijaEmisor.emisor.nombre,
                  rentaCantidad: +jugadaRentaFija.cantidad,
                  rentaPrecio: +jugadaRentaFija.ronda.rentafijaRondas[0].precio,
                  rentaValor: (+jugadaRentaFija.cantidad * +jugadaRentaFija.ronda.rentafijaRondas[0].precio),
                  rentaEstado: jugadaRentaFija.ronda.rentafijaRondas[0].estado === 'I' ? 'Pagado' : 'Espera',
                };
              }
            }
          ).filter( valor => {
            if (valor) {
              return valor;
            }
          });
          return {
            source: 'assets/imagenes/trofeos/segundo.png',
            dineroActual: jugador.dineroActual,
            nombre: jugador.participante.nombre,
            width: 200,
            height: 100,
            subtotal: +totalAccionesSefundo,
            total: +totalAccionesSefundo + +jugador.dineroActual,
            acciones: jugador.accionesParticipante,
            rentaFija: jugadasRentaSegundo,
            indice: index,
          };
        case 2:
          let totalAccionesSterce = 0;
          for (const accionEmisor of jugador.accionesParticipante) {
            totalAccionesSterce = +totalAccionesSterce + (+accionEmisor.cantidad * +accionEmisor.emisorJuego.precioActual);
            totalAccionesSterce = +totalAccionesSterce.toFixed(2);
          }
          const jugadasRentaTercer = jugador.jugadasParticipante.map(
            jugadaRentaFija => {
              if (jugadaRentaFija.idRentaFijaRonda) {
                return {
                  rentaEmisor: jugadaRentaFija.ronda.rentafijaRondas[0].rentaFijaEmisor.emisor.nombre,
                  rentaCantidad: +jugadaRentaFija.cantidad,
                  rentaPrecio: +jugadaRentaFija.ronda.rentafijaRondas[0].precio,
                  rentaValor: (+jugadaRentaFija.cantidad * +jugadaRentaFija.ronda.rentafijaRondas[0].precio),
                  rentaEstado: jugadaRentaFija.ronda.rentafijaRondas[0].estado === 'I' ? 'Pagado' : 'Espera',
                };
              }
            }
          ).filter( valor => {
            if (valor) {
              return valor;
            }
          });
          return {
            source: 'assets/imagenes/trofeos/tercer.png',
            dineroActual: jugador.dineroActual,
            nombre: jugador.participante.nombre,
            width: 200,
            height: 100,
            subtotal: +totalAccionesSterce,
            total: +totalAccionesSterce + +jugador.dineroActual,
            acciones: jugador.accionesParticipante,
            rentaFija: jugadasRentaTercer,
            indice: index,
          };
        default:
          let totalAcciones = 0;
          for (const accionEmisor of jugador.accionesParticipante) {
            totalAcciones = +totalAcciones + (+accionEmisor.cantidad * +accionEmisor.emisorJuego.precioActual);
            totalAcciones = +totalAcciones.toFixed(2);
          }
          const jugadasRenta = jugador.jugadasParticipante.map(
            jugadaRentaFija => {
              if (jugadaRentaFija.idRentaFijaRonda) {
                return {
                  rentaEmisor: jugadaRentaFija.ronda.rentafijaRondas[0].rentaFijaEmisor.emisor.nombre,
                  rentaCantidad: +jugadaRentaFija.cantidad,
                  rentaPrecio: +jugadaRentaFija.ronda.rentafijaRondas[0].precio,
                  rentaValor: (+jugadaRentaFija.cantidad * +jugadaRentaFija.ronda.rentafijaRondas[0].precio),
                  rentaEstado: jugadaRentaFija.ronda.rentafijaRondas[0].estado === 'I' ? 'Pagado' : 'Espera',
                };
              }
            }
          ).filter( valor => {
            if (valor) {
              return valor;
            }
          });
          return {
            source: 'assets/imagenes/trofeos/uio.png',
            dineroActual: jugador.dineroActual,
            nombre: jugador.participante.nombre,
            width: 200,
            height: 100,
            subtotal: +totalAcciones,
            total: +totalAcciones + +jugador.dineroActual,
            acciones: jugador.accionesParticipante,
            rentaFija: jugadasRenta,
            indice: index,
          };
      }
    });
  }
}
