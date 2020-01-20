import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {JuegoRestService} from '../../../../servicios/rest/servicios/juego-rest.service';
import {JuegoInterface} from '../../../../interfaces/interfaces/juego.interface';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';

@Component({
  selector: 'app-ruta-listar-juegos',
  templateUrl: './ruta-listar-juegos.component.html',
  styleUrls: ['./ruta-listar-juegos.component.scss']
})
export class RutaListarJuegosComponent implements OnInit {

  tipoUsuario;
  tituloBarraBusqueda = 'Buscar juego';
  ayudaBarraBusqueda = 'Busque un juego por su nombre';
  placeholder = 'EJ: Juego 1';
  juegos: JuegoInterface[];

  skip = 0;
  take = 10;
  pagina = 0;
  tipoFiltro: 'espera' | 'jugando' | 'terminado' | '';
  mostrarCargarMas = true;

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _juegoRestService: JuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
    this.cargarJuegos('espera');
  }

  irACrearNuevoJuego() {
    const rutaCrearJuego = ['/administrador/menu/juegos/crear-juego'];
    this._router.navigate(rutaCrearJuego);
  }

  cargarJuegos(tipoFiltro: 'espera' | 'jugando' | 'terminado' | '',
               cargarMas?: boolean) {

    if (cargarMas) {
      this.pagina++;
      this.skip = this.pagina * this.take;
    } else {
      this.pagina = 0;
      this.skip = 0;
      this.mostrarCargarMas = true;
    }
    // ['I', 'E', 'J', 'CA', 'CO'],
    const consulta = {
      where: [],
      relations: ['participantesJuego', 'participantesJuego.participante', 'rondas'],
      skip: this.skip,
      take: this.take,
      order: {
        id: 'DESC',
      },
    };
    this.tipoFiltro = tipoFiltro;
    if (tipoFiltro === 'espera') {
      // Anadir en Iniciado o Espera
      consulta.where.push({
        estado: 'I'
      });
      consulta.where.push({
        estado: 'E'
      });
    }
    if (tipoFiltro === 'jugando') {
      // Anadir en Jugando o Calculos
      consulta.where.push({
        estado: 'J'
      });
      consulta.where.push({
        estado: 'CA'
      });
    }
    if (tipoFiltro === 'terminado') {
      // Anadir en terminado
      consulta.where.push({
        estado: 'CO'
      });
    }
    this._cargandoService.habilitarCargando();
    this._juegoRestService
      .findAll(JSON.stringify(consulta))
      .subscribe(
        (juegos: [JuegoInterface[], number]) => {
          this._cargandoService.deshabilitarCargando();
          if (cargarMas) {
            this.juegos.push(...juegos[0]);
          } else {
            this.juegos = juegos[0];
          }
          if (this.juegos.length === juegos[1]) {
            this.mostrarCargarMas = false;
          }
        },
        (error) => {
          this._cargandoService.deshabilitarCargando();
          console.error({
            error,
            mensaje: 'Error consultando juegos',
          });
          this._toasterService.pop(
            'error',
            'Error',
            'Error del servidor, intentálo más tarde.'
          );
        }
      );
  }

  buscarJuego(busqueda: string) {
    this.tipoFiltro = '';
    this.mostrarCargarMas = false;
    this._cargandoService.habilitarCargando();
    this._juegoRestService
      .buscarJuegoPorNombre(busqueda)
      .subscribe(
        (data) => {
          this.juegos = data[0];
          this._cargandoService.deshabilitarCargando();
        },
        (error) => {
          this._cargandoService.deshabilitarCargando();
          console.error({
            error,
            mensaje: 'Error consultando juegos',
          });
          this._toasterService.pop(
            'error',
            'Error',
            'Error del servidor, intentálo más tarde.'
          );
        }
      );
  }
}
