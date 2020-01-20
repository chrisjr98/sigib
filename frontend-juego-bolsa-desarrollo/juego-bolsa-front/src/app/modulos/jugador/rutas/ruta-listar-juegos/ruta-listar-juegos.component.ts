import {Component, OnInit} from '@angular/core';
import {PATH_IMAGEN} from '../../../../constantes/opciones-menu-inicio';
import {ActivatedRoute, Router} from '@angular/router';
import {JuegoRestService} from '../../../../servicios/rest/servicios/juego-rest.service';
import {SocketJuegoService} from '../../../../servicios/rest/servicios/socket-juego-rest.service';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-listar-juegos',
  templateUrl: './ruta-listar-juegos.component.html',
  styleUrls: ['./ruta-listar-juegos.component.scss']
})
export class RutaListarJuegosComponent implements OnInit {

  tipoUsuario: string;
  path = PATH_IMAGEN;
  arregloJuegos = [];

  skip = 0;
  take = 10;
  pagina = 0;
  mostrarCargarMas = true;
  tipoJuegos: 'porIniciar' | 'iniciado' = 'porIniciar';

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly _juegoRestService: JuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _socketJuegoService: SocketJuegoService,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
    this._activatedRoute
      .data
      .subscribe(
        (datos) => {
          this.tipoUsuario = datos.tipoUsuario;
          this.buscarJuegos();
        }
      );
  }

  buscarJuegos() {
    this.listaDeJuegos('porIniciar');
    this._socketJuegoService
      .eventoJuegoCreado
      .subscribe(
        juego => {
          juego.juego.path = PATH_IMAGEN;
          this.arregloJuegos.unshift(juego.juego);
        }
      );
    this._socketJuegoService
      .eventoJuegoActualizado
      .subscribe(
        (juego: any) => {
          const indiceJuegoArreglo = this.arregloJuegos
            .findIndex((resgistro) => resgistro.id === juego.juego.id);
          this.arregloJuegos[indiceJuegoArreglo].estado = juego.juego.estado;
          // r.juego.path = PATH_IMAGEN;
          // this.arregloJuegos.unshift(r.juego);
        }
      );
  }

  listaDeJuegos(tipoJuegos: 'porIniciar' | 'iniciado',
                cargarMas = false) {
    this.tipoJuegos = tipoJuegos;
    if (cargarMas) {
      this.pagina++;
      this.skip = this.pagina * this.take;
    } else {
      this.pagina = 0;
      this.skip = 0;
      this.mostrarCargarMas = true;
    }

    const consulta = {
      relations: ['participantesJuego'],
      where: [],
      skip: this.skip,
      take: this.take,
      order: {
        id: 'DESC',
      },
    };
    if (tipoJuegos === 'porIniciar') {
      consulta.where.push({
        estado: 'I',
      });
      consulta.where.push({
        estado: 'E',
      });
    }
    if (tipoJuegos === 'iniciado') {
      consulta.where.push({
        estado: 'J',
      });
      consulta.where.push({
        estado: 'CA',
      });
    }
    this._cargandoService.habilitarCargando();
    this._juegoRestService
      .findAll(JSON.stringify(consulta))
      .subscribe(
        (juegos) => {
          if (cargarMas) {
            this.arregloJuegos.push(
              ...juegos[0].map(
                (juego) => {
                  juego.path = PATH_IMAGEN;
                  return juego;
                }
              )
            );
          } else {
            this.arregloJuegos = juegos[0].map(
              (juego) => {
                juego.path = PATH_IMAGEN;
                return juego;
              }
            );
          }
          if (this.arregloJuegos.length === juegos[1]) {
            this.mostrarCargarMas = false;
          }
          this._cargandoService.deshabilitarCargando();
        },
        (error) => {
          this._cargandoService.deshabilitarCargando();
          console.error({
            error,
            mensaje: 'Error al consultar los juegos',
          });
          this._toasterService.pop(
            'error',
            'Error',
            'Error del servidor. Inténtalo más tarde',
          );
        }
      );
  }

  limpiarLocalStorage() {
    const respuesta: boolean = confirm('¿Está seguro de eliminar los datos guardados?. Si no lo sabe pregunte al moderador');
    if (respuesta) {
      localStorage.clear();
    }
  }

}
