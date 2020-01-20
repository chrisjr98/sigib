import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {ESTADOS} from '../../../../enums/estados';
import {NivelJuegoRestService} from '../../../../servicios/rest/servicios/nivel-juego-rest.service';
import {CrearEditarNivelComponent} from '../../modales/crear-editar-nivel/crear-editar-nivel.component';
import {NivelJuegoInterface} from '../../../../interfaces/interfaces/nivel-juego.interface';
import {OPCIONES_HABILITADO_SELECT} from '../../../../constantes/opciones-habilitado-select';
import {ToasterService} from 'angular2-toaster';
import {
  ToastErrorEstado, toastErrorMostrar,
  ToastExitoEstado
} from '../../../../constantes/mensajes-toaster';
import {CrearEditarRangosValorComponent} from '../../modales/crear-editar-rangos-valor/crear-editar-rangos-valor.component';
import {ConfiguracionesRestService} from '../../../../servicios/rest/servicios/configuraciones-rest.service';
import {NUMERO_FILAS_TABLAS} from '../../../../constantes/numero-filas-tablas';

@Component({
  selector: 'app-ruta-gestion-nivel',
  templateUrl: './ruta-gestion-nivel.component.html',
  styleUrls: ['./ruta-gestion-nivel.component.scss']
})
export class RutaGestionNivelComponent implements OnInit {

  tituloBarraBusqueda = 'Buscar un nivel';
  ayudaBarraBusqueda = 'Busque un nivel por su nombre (La búsqueda no se combina con el filtro).';
  placeholder = 'Ej: Difícil';

  opcionesHabilitado = OPCIONES_HABILITADO_SELECT;

  ruta = [];
  estados = ESTADOS;

  rows = NUMERO_FILAS_TABLAS;
  totalRecords: number;
  loading = false;
  queryParams: any = {};
  skip = 0;
  busqueda = '';
  consulta;

  columnas = [
    {field: 'nombre', header: 'Nombre'},
    {field: 'habilitado', header: 'Estado'},
    {field: 'id', header: 'Acciones'},
  ];

  configuraciones;
  niveles;

  constructor(
    public dialog: MatDialog,
    // tslint:disable-next-line:variable-name
    private readonly _configuracionesRestService: ConfiguracionesRestService,
    // tslint:disable-next-line:variable-name
    private readonly _nivelJuegoRestService: NivelJuegoRestService,
    // tslint:disable-next-line:variable-name
    private _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(queryParams => {
      this.queryParams.skip = queryParams.skip ? +queryParams.skip : 0;
      this.queryParams.busqueda = queryParams.busqueda;
      if (this.queryParams.busqueda) {
        this.consulta = {
          where: {
            nombre: this.queryParams.busqueda
          },
          relations: ['configuraciones'],
          skip: this.queryParams.skip,
          take: this.rows,
          order: {
            id: 'DESC',
          }
        };
      } else {
        this.consulta = {
          relations: ['configuraciones'],
          where: {},
          skip: this.queryParams.skip,
          take: this.rows,
          order: {
            id: 'DESC',
          }
        };
      }
      this.buscar();
    }, error => {
      console.error('Error en acceder a la ruta');
      this._toasterService.pop(toastErrorMostrar);
    });
  }

  abrirModalEditarNivel(registro) {
    const indiceRegistro = this.niveles.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarNivelComponent, {
      width: '950px',
      data: {nivel: registro},
    });
    dialogRef
      .afterClosed()
      .subscribe((registroEditado: NivelJuegoInterface) => {
        if (registroEditado) {
          this.niveles[indiceRegistro] = registroEditado;
        }
      });

  }

  async abrirModalCrearNivel() {
    const dialogRef = await this.dialog.open(CrearEditarNivelComponent, {
      width: '800px',
      data: {
        nivel: undefined,
      },
    });
    dialogRef
      .afterClosed()
      .subscribe(async (registroCreado: NivelJuegoInterface) => {
        if (registroCreado) {
          this.niveles.unshift(registroCreado);
        }
      });
  }

  actualizarEstado(registro) {
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    const nivelEnArreglo = this.niveles.find(
      nivel => registro.id === nivel.id,
    );
    const indiceNivel = this.niveles.indexOf(nivelEnArreglo);
    this._nivelJuegoRestService
      .updateOne(registro.id, {habilitado})
      .subscribe(
        () => {
          this.niveles[indiceNivel].habilitado = habilitado
            ? ESTADOS.Activo
            : ESTADOS.Inactivo;
          this._toasterService.pop(ToastExitoEstado);
        },
        error => {
          console.error(error);
          this._toasterService.pop(ToastErrorEstado);
        },
      );
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this._router.navigate(this.ruta, {
      queryParams: {...this.queryParams}
    });
    this.loading = false;
    this._configuracionesRestService.findAll().subscribe(respConfig => {
      this.configuraciones = respConfig[0];
    });
  }

  buscarBarra(event) {
    this.loading = true;
    this.busqueda = event;
    if (event) {
      this.queryParams.busqueda = event;
      this.queryParams.skip = 0;
      this.loading = false;
    } else {
      delete this.queryParams.busqueda;
      this.queryParams.skip = 0;
      this.loading = false;
    }
    this._router.navigate(this.ruta, {
      queryParams: {...this.queryParams}
    });
  }

  buscar() {
    this._nivelJuegoRestService
      .obtenerNivelesLike(this.consulta)
      .subscribe(
        (respuesta: [NivelJuegoInterface[], number]) => {
          this.niveles = respuesta[0];
          this.totalRecords = respuesta[1];
          this.loading = false;
        }, error => {
          this.loading = false;
          console.error('Error en el servidor', error);
        }
      );
  }

  buscarPorEstado(evento) {
    this.consulta = {
      where: [
        evento ? {habilitado: evento.valor} : {}
      ],
      relations: ['configuraciones'],
      skip: this.queryParams.skip,
      take: this.rows,
      order: {
        id: 'DESC',
      }
    };
    this.queryParams.where = evento ? {habilitado: evento.valor} : {};
    this.buscar();
  }

  async abrirModalEditarConfiguracion(registro) {
    const index = this.niveles.findIndex( nivel => nivel === registro);
    const dialogRef = this.dialog.open(CrearEditarRangosValorComponent, {
      width: '950px',
      data: {
        configuracion: registro.configuraciones,
        esNuevo: false,
        esVerDetalles: false
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((registroEditado: NivelJuegoInterface) => {
        if (registroEditado) {
          this.niveles[index].configuraciones = registroEditado;
        }
      });
  }

  async abrirModalCrearConfiguracion(nivelCreado) {
    const dialogRef = await this.dialog.open(CrearEditarRangosValorComponent, {
      width: '400px',
      data: {
        configuracion: undefined,
        esNuevo: true,
        esVerDetalles: false
      },
    });
    dialogRef
      .afterClosed()
      .subscribe(async (registroCreado) => {
        if (registroCreado) {
          await this._nivelJuegoRestService
            .updateOne(nivelCreado.id, {configuraciones: registroCreado.id})
            .subscribe( confi => {
              nivelCreado.configuraciones = registroCreado;
              this.niveles.unshift(nivelCreado);
            });
          // this.niveles
        }
      });
  }

  async abrirModalVerConfiguracion(registro) {
    const dialogRef = this.dialog.open(CrearEditarRangosValorComponent, {
      width: '950px',
      data: {
        configuracion: registro.configuraciones,
        esNuevo: false,
        esVerDetalles: true
      },
    });
    dialogRef
      .afterClosed()
      .subscribe(() => {
      });
  }
}
