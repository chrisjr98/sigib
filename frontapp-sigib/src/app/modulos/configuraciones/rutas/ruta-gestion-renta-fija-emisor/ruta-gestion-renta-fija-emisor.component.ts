import {Component, OnInit} from '@angular/core';
import {OPCIONES_HABILITADO_SELECT} from '../../../../constantes/opciones-habilitado-select';
import {ESTADOS} from '../../../../constantes/estados';
import {RentaFijaEmisorInterface} from '../../../../interfaces/interfaces/renta-fija-emisor.interface';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';
import {RentaFijaEmisorRestService} from '../../../../servicios/rest/servicios/renta-fija-emisor-rest.service';
import {CrearEditarRentaFijaEmisorComponent} from '../../modales/crear-editar-renta-fija-emisor/crear-editar-renta-fija-emisor.component';
import {NUMERO_FILAS_TABLAS} from '../../../../constantes/numero-filas-tablas';
import {NivelJuegoInterface} from '../../../../interfaces/interfaces/nivel-juego.interface';
import {NivelJuegoRestService} from '../../../../servicios/rest/servicios/nivel-juego-rest.service';
import {RentaFijaRestService} from '../../../../servicios/rest/servicios/renta-fija-rest.service';
import {RentaFijaInterface} from '../../../../interfaces/interfaces/renta-fija.interface';
import {EmisorRestService} from '../../../../servicios/rest/servicios/emisor-rest.service';

@Component({
  selector: 'app-ruta-gestion-renta-fija-emisor',
  templateUrl: './ruta-gestion-renta-fija-emisor.component.html',
  styleUrls: ['./ruta-gestion-renta-fija-emisor.component.scss']
})
export class RutaGestionRentaFijaEmisorComponent implements OnInit {
  rentaFijaEmisor: RentaFijaEmisorInterface[];
  opcionesHabilitado = OPCIONES_HABILITADO_SELECT;
  columnas = [
    {field: 'rentaFija', header: 'Tipo'},
    {field: 'tiempo', header: 'Plazo'},
    {field: 'rendimiento', header: 'Rendimiento'},
    {field: 'habilitado', header: 'Estado'},
    {field: 'acciones', header: 'Acciones'},
  ];
  rows = NUMERO_FILAS_TABLAS;
  totalRecords: number;
  loading: boolean;
  queryParams: any = {};
  estados = ESTADOS;
  busqueda = '';
  consulta;
  ruta = [];
  emisor: number;
  rentasFijas: RentaFijaInterface[];
  nombreEmisor = '';

  constructor(
    public dialogo: MatDialog,
    // tslint:disable-next-line:variable-name
    private readonly _rentaFijaEmisorRestService: RentaFijaEmisorRestService,
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    // tslint:disable-next-line:variable-name
    private readonly _nivelJuegoRestService: NivelJuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _rentaFijaRestService: RentaFijaRestService,
    // tslint:disable-next-line:variable-name
    private readonly _emisorService: EmisorRestService,
  ) {
    this.cargarRentaFija();
  }

  ngOnInit() {
    this._activatedRoute
      .params
      .subscribe(params => {
        this.emisor = params.idEmisor;
        this._emisorService
          .findOne(this.emisor).subscribe(
          emisor => {
            this.nombreEmisor = emisor.nombre;
          }
        );
      }, error => {
        console.error('Error en acceder a la ruta params');
      });
    this._activatedRoute.queryParams.subscribe(queryParams => {
      this.queryParams.skip = queryParams.skip ? +queryParams.skip : 0;
      this.queryParams.where = queryParams.where ? JSON.parse(queryParams.where) : {};
      // tslint:disable-next-line:max-line-length
      this.queryParams.where.habilitado = this.queryParams.where.habilitado === 0 || this.queryParams.where.habilitado === 1 ? this.queryParams.where.habilitado : undefined;
      this.queryParams.where.rentaFija = this.queryParams.where.rentaFija ? this.queryParams.where.rentaFija : undefined;
    }, error => {
      console.error('Error en acceder a la ruta query params');
    });
  }

  abrirDialogo(): void {
    const dialogRef = this.dialogo.open(
      CrearEditarRentaFijaEmisorComponent,
      {
        width: '800px',
        data: {emisor: this.emisor},
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rentaFijaEmisor.unshift(result);
      }
    });
  }

  abrirModalEditar(registro): void {
    const indice = this.rentaFijaEmisor.findIndex(r => r.id === registro.id);
    if (indice >= 0) {
      const dialogRef = this.dialogo.open(
        CrearEditarRentaFijaEmisorComponent,
        {
          width: '800px',
          data: {rentaFijaEmisor: registro},
        }
      );

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.rentaFijaEmisor[indice] = result;
        }
      });
    }
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.buscar();
  }

  buscar() {
    this.queryParams.where = {
      rentaFija: this.queryParams.where.rentaFija,
      habilitado: this.queryParams.where.habilitado
    };
    this.consulta = {
      where: this.queryParams.where,
      skip: this.queryParams.skip,
      take: this.rows,
      order: {
        id: 'DESC',
      },
      relations: ['rentaFija']
    };
    this.consulta.where.emisor = this.emisor;
    this._rentaFijaEmisorRestService.findAll(JSON.stringify(this.consulta))
      .subscribe(
        (respuesta: [RentaFijaEmisorInterface[], number]) => {
          this.rentaFijaEmisor = respuesta[0];
          this.totalRecords = respuesta[1];
          delete this.queryParams.where.emisor;
          this._router.navigate(this.ruta, {
            queryParams: {
              where: JSON.stringify(this.queryParams.where),
              skip: this.queryParams.skip,
            }
          });
          this.loading = false;
        }, error => {
          this.loading = false;
          console.error('Error en el servidor', error);
        }
      );
  }

  actualizarEstado(registro) {
    this._cargandoService.habilitarCargando();
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    const rentaFijaEmisorEnArreglo = this.rentaFijaEmisor.find(
      papelesRentaFija => registro.id === papelesRentaFija.id,
    );
    const indicePapelRentaFija = this.rentaFijaEmisor.indexOf(rentaFijaEmisorEnArreglo);
    this._rentaFijaEmisorRestService.updateOne(registro.id, {habilitado}).subscribe(
      () => {
        this.rentaFijaEmisor[indicePapelRentaFija].habilitado = habilitado
          ? ESTADOS.Activo
          : ESTADOS.Inactivo;
        this._toasterService.pop('success', 'Éxito', 'El papel de renta fija se ha editado correctamente');
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop('error', 'Error', 'Error al editar la noticia');
      },
    );
  }

  private cargarRentaFija() {
    this._rentaFijaRestService.findAll()
      .subscribe(
        (respuesta: [RentaFijaInterface[], number]) => {
          this.rentasFijas = respuesta[0];
        }
        , error => {
          console.error(error);
          this._toasterService.pop('error', 'Error', 'Error al cargar los niveles de juego');
        }
      );
  }

  buscarPorEstado(evento) {
    this.queryParams.where.habilitado = evento ? evento.valor : undefined;
    this.queryParams.skip = 0;
    this.buscar();
  }


  buscarPorNivel(evento) {
    this.queryParams.where = evento ? {nivelJuego: evento.id} : {};
    this.queryParams.skip = 0;
    this.buscar();
  }

  buscarPorTipo(evento) {
    this.queryParams.where.rentaFija = evento ? evento.id : undefined;
    this.queryParams.skip = 0;
    this.buscar();
  }
}
