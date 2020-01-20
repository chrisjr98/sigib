import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {CrearEditarEmisoresComponent} from '../../modales/crear-editar-emisores/crear-editar-emisores.component';
import {EmisorInterface} from '../../../../interfaces/interfaces/emisor.interface';
import {EmisorRestService} from '../../../../servicios/rest/servicios/emisor-rest.service';
import {ESTADOS} from '../../../../enums/estados';
import {ActivatedRoute, Router} from '@angular/router';
import {NUMERO_FILAS_TABLAS} from '../../../../constantes/numero-filas-tablas';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';
import {ESTADOS_VENDEDOR} from '../../../../enums/estados_venta';
import {ToastErrorEstado, ToastExitoEstado} from '../../../../constantes/mensajes-toaster';
import {OPCIONES_HABILITADO_SELECT} from '../../../../constantes/opciones-habilitado-select';

@Component({
  selector: 'app-ruta-gestion-emisores',
  templateUrl: './ruta-gestion-emisores.component.html',
  styleUrls: ['./ruta-gestion-emisores.component.scss']
})
export class RutaGestionEmisoresComponent implements OnInit {

  estados = ESTADOS;
  opcionesHabilitado = OPCIONES_HABILITADO_SELECT;
  esVendedor = ESTADOS_VENDEDOR;

  rows = NUMERO_FILAS_TABLAS;
  totalRecords: number;
  loading: boolean;
  queryParams: any = {where: {}};
  skip = 0;
  busqueda = '';
  ruta = [];
  emisores;
  consulta;

  columnas = [
    { field: 'pathLogo', header: 'Logo'},
    { field: 'nombre', header: 'Nombre' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'vendeRentaFija', header: 'Vende papeles renta fija' },
    { field: 'vendeAcciones', header: 'Vende acciones' },
    { field: 'habilitado', header: 'Estado' },
    { field: 'id', header: 'Acciones' },
  ];

  constructor(
    public dialog: MatDialog,
    // tslint:disable-next-line:variable-name
    private readonly _emisorRestService: EmisorRestService,
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    // tslint:disable-next-line:variable-name
    private _router: Router
  ) { }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(queryParams => {
      this.queryParams.skip = queryParams.skip ? +queryParams.skip : 0;
      this.queryParams.where = !queryParams.where || queryParams.where === '%7B%7D' ? {} : JSON.parse(queryParams.where);
    }, error => {
      console.error('Error en acceder a la ruta');
    });
  }

  abrirModalEditarEmisor(registro) {
    const indiceRegistro = this.emisores.indexOf(registro);
    const dialogRef = this.dialog.open(CrearEditarEmisoresComponent, {
      width: '500px',
      data: { emisor: registro },
    });
    dialogRef
      .afterClosed()
      .subscribe((registroEditado: EmisorInterface) => {
        if (registroEditado) {
          this.emisores[indiceRegistro] = registroEditado;
        }
      });

  }




  abrirModalCrearEmisor() {
    const dialogRef = this.dialog.open(CrearEditarEmisoresComponent, {
      width: '500px',
      data: {
        emisor: undefined,
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$
      .subscribe((registroCreado: EmisorInterface) => {
        if (registroCreado) {
         this.emisores.unshift(registroCreado);
        }
      });
  }

  actualizarEstado(registro) {
    this._cargandoService.habilitarCargando();
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    const emisorArreglo = this.emisores.find(
      emisor => registro.id === emisor.id,
    );
    const indiceEmisor = this.emisores.indexOf(emisorArreglo);
    this._emisorRestService.updateOne(registro.id, { habilitado }).subscribe(
      () => {
        this.emisores[indiceEmisor].habilitado = habilitado
          ? ESTADOS.Activo
          : ESTADOS.Inactivo;
        this._toasterService.pop(ToastExitoEstado);
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(ToastErrorEstado);
      },
    );
  }

  actualizarVendeAcciones(registro: EmisorInterface) {
    this._cargandoService.habilitarCargando();
    const vendeAcciones = registro.vendeAcciones === ESTADOS_VENDEDOR.No;
    const emisorArreglo = this.emisores.find(
      emisor => registro.id === emisor.id,
    );
    const indiceEmisor = this.emisores.indexOf(emisorArreglo);
    this._emisorRestService.updateOne(registro.id, { vendeAcciones }).subscribe(
      () => {
        this.emisores[indiceEmisor].vendeAcciones = vendeAcciones
          ? ESTADOS_VENDEDOR.Si
          : ESTADOS_VENDEDOR.No;
        this._toasterService.pop(ToastExitoEstado);
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(ToastErrorEstado);
      },
    );
  }

  actualizarVende(registro: EmisorInterface) {
    this._cargandoService.habilitarCargando();
    const vendeRentaFija = registro.vendeRentaFija === ESTADOS_VENDEDOR.No;
    const emisorArreglo = this.emisores.find(
      emisor => registro.id === emisor.id,
    );
    const indiceEmisor = this.emisores.indexOf(emisorArreglo);
    this._emisorRestService.updateOne(registro.id, { vendeRentaFija }).subscribe(
      () => {
        this.emisores[indiceEmisor].vendeRentaFija = vendeRentaFija
          ? ESTADOS_VENDEDOR.Si
          : ESTADOS_VENDEDOR.No;
        this._toasterService.pop(ToastExitoEstado);
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop(ToastErrorEstado);
      },
    );
  }

  buscarPorNombre(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.queryParams.where = this.busqueda  === '' ? {} : {nombre: this.busqueda};
    this.buscar(this.queryParams.skip);
  }


  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.buscar(this.queryParams.skip);
  }

  buscar(skip: number) {
    const consulta = {
      where: this.queryParams.where,
      skip,
      take: this.rows,
      order: {id: 'DESC'},
    };
    this._emisorRestService.obtenerEmisoresLike((consulta))
      .subscribe(
        (respuesta: [EmisorInterface[], number])  => {
          this.emisores = respuesta[0];
          this.totalRecords = respuesta[1];
          this.loading = false;
          this._router.navigate(this.ruta, {
            queryParams: {
              skip: this.queryParams.skip,
              where: JSON.stringify(this.queryParams.where),
            }
          });
        }, error => {
          this.loading = false;
          console.error('Error en el servidor', error);
          this._toasterService.pop('error', 'Error', 'Error al cargar las noticia');
        }
      );
  }

  irPapelesRentaFija(idEmisor: number) {
    this._router.navigate(['administrador', 'menu', 'configuraciones', 'menu-ajustes', 'emisores', idEmisor, 'papeles-renta-fija']);
  }
  irNoticiasEmisor(idEmisor: number) {
    this._router.navigate(['administrador', 'menu', 'configuraciones', 'menu-ajustes', 'emisores', idEmisor, 'noticias']);
  }

  buscarPorEstado(evento) {
    this.queryParams.where = evento ? {habilitado: evento.valor} : {};
    this.buscar(this.queryParams.skip);
  }


}
