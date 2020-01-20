import {Component, OnInit} from '@angular/core';
import {ConfiguracionesRestService} from '../../../../servicios/rest/servicios/configuraciones-rest.service';
import {ESTADOS} from '../../../../enums/estados';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {NivelJuegoInterface} from '../../../../interfaces/interfaces/nivel-juego.interface';
import {QueryParamsInterface} from '../../../../interfaces/interfaces/query-params.interface';
import {ConfiguracionesInterface} from '../../../../interfaces/interfaces/configuraciones.interface';
import {CrearEditarRangosValorComponent} from '../../modales/crear-editar-rangos-valor/crear-editar-rangos-valor.component';
import {ToasterService} from 'angular2-toaster';
import {toastErrorMostrar } from '../../../../constantes/mensajes-toaster';
import {NivelJuegoRestService} from '../../../../servicios/rest/servicios/nivel-juego-rest.service';

@Component({
  selector: 'app-ruta-rango-valores',
  templateUrl: './ruta-rango-valores.component.html',
  styleUrls: ['./ruta-rango-valores.component.scss']
})
export class RutaRangoValoresComponent implements OnInit {

  tituloBarraBusqueda = 'Buscar papel de nivel';
  ayudaBarraBusqueda = 'Busque un nivel por nombre';
  placeholder = 'Ej: Fácil';

  configuraciones;
  estados = ESTADOS;

  ruta = [];

  rows = 2;
  totalRecords: number;
  loading = false;
  queryParams: QueryParamsInterface = {};
  skip = 0;
  busqueda = '';
  consulta;
  columnas = [
    {field: 'nivelJuego', header: 'Nivel'},
    {field: 'id', header: 'Acciones'},
  ];
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
    this._nivelJuegoRestService.findAll().subscribe( niveles => {
      this.niveles = niveles[0];
    });
    this._activatedRoute.queryParams.subscribe(queryParams => {
      this.queryParams.skip = queryParams.skip ? +queryParams.skip : 0;
      this.queryParams.busqueda = queryParams.busqueda;
      if (this.queryParams.busqueda) {
        this.consulta = {
          nombre: queryParams.busqueda,
          skip: this.queryParams.skip,
          take: this.rows
        };
        this.buscarPorNombre();
      } else {
        this.consulta = {
          relations: ['nivelJuego'],
          skip: this.queryParams.skip,
          take: this.rows,
          order: {
            id: 'DESC',
          }
        };
        this.buscar();
      }
    }, error => {
      this._toasterService.pop(toastErrorMostrar);
      console.error('Error en acceder a la ruta');
    });
  }

  abrirModalEditarConfiguracion(registro) {
    const indiceRegistro = this.configuraciones.indexOf(registro);
    const nivel = registro.nivelJuego;
    const dialogRef = this.dialog.open(CrearEditarRangosValorComponent, {
      width: '950px',
      data: {
        configuracion: registro,
        esNuevo: false,
        esVerDetalles: false
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((registroEditado: NivelJuegoInterface) => {
        if (registroEditado) {
          this.configuraciones[indiceRegistro] = registroEditado;
          this.configuraciones[indiceRegistro].nivelJuego = nivel;
        }
      });
  }

  abrirModalCrearConfiguracion() {
    const dialogRef = this.dialog.open(CrearEditarRangosValorComponent, {
      width: '700px',
      data: {
        configuracion: undefined,
        esNuevo: true,
        esVerDetalles: false
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((registroCreado) => {
        if (registroCreado) {
          this.configuraciones.unshift(registroCreado);
        }
      });
  }

  abrirModalVerConfiguracion(registro) {
    const dialogRef = this.dialog.open(CrearEditarRangosValorComponent, {
      width: '700px',
      data: {
        configuracion: registro,
        esNuevo: false,
        esVerDetalles: true
      },
    });
    dialogRef
      .afterClosed()
      .subscribe(() => {
      });
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this._router.navigate(this.ruta, {
      queryParams: {...this.queryParams}
    });
    this.loading = false;
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
    this._configuracionesRestService.findAll(JSON.stringify(this.consulta))
      .subscribe(
        (respuesta: [ConfiguracionesInterface[], number]) => {
          this.configuraciones = respuesta[0];
          this.totalRecords = respuesta[1];
          this.loading = false;
        }, error => {
          this.loading = false;
          console.error('Error en el servidor', error);
        }
      );
  }

  buscarPorNombre() {
    this._configuracionesRestService.buscarNivelPorNombre(JSON.stringify(this.consulta))
      .subscribe(
        (respuesta: [ConfiguracionesInterface[], number]) => {
          this.configuraciones = respuesta[0];
          this.totalRecords = respuesta[1];
          this.loading = false;
        }, error => {
          this.loading = false;
          console.error('Error en el servidor', error);
        }
      );
  }

}
