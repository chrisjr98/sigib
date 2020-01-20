import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
// tslint:disable-next-line:max-line-length
import {CrearEditarRentaFijaComponent} from '../../modales/crear-editar-renta-fija/crear-editar-renta-fija.component';
import {RentaFijaInterface} from '../../../../interfaces/interfaces/renta-fija.interface';
import {RentaFijaRestService} from '../../../../servicios/rest/servicios/renta-fija-rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';
import {ESTADOS} from '../../../../constantes/estados';
import {QueryParamsInterface} from '../../../../interfaces/interfaces/query-params.interface';
import {OPCIONES_HABILITADO_SELECT} from '../../../../constantes/opciones-habilitado-select';
import {NUMERO_FILAS_TABLAS} from '../../../../constantes/numero-filas-tablas';

@Component({
  selector: 'app-ruta-gestion-papeles-renta-fija',
  templateUrl: './ruta-gestion-renta-fija.component.html',
  styleUrls: ['./ruta-gestion-renta-fija.component.scss']
})
export class RutaGestionRentaFijaComponent implements OnInit {

  rentaFija: RentaFijaInterface[];
  opcionesHabilitado = OPCIONES_HABILITADO_SELECT;
  columnas = [
    {field: 'tipoValor', header: 'Tipo Valor'},
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

  constructor(
    public dialogo: MatDialog,
    // tslint:disable-next-line:variable-name
    private readonly _rentaFijaRestService: RentaFijaRestService,
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
  ) {
  }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(queryParams => {
      this.queryParams.skip = queryParams.skip ? +queryParams.skip : 0;
      this.queryParams.where = queryParams.where ? JSON.parse(queryParams.where) : {};
    }, error => {
      console.error('Error en acceder a la ruta');
    });
  }

  abrirDialogo(): void {
    const dialogRef = this.dialogo.open(
      CrearEditarRentaFijaComponent,
      {
        data: {},
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.rentaFija.unshift(result);
      }
    });
  }

  abrirModalEditar(registro): void {
    const indice = this.rentaFija.findIndex(r => r.id === registro.id);
    if (indice >= 0) {
      const dialogRef = this.dialogo.open(
        CrearEditarRentaFijaComponent,
        {
          data: {rentaFija: registro},
        }
      );

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
        this.rentaFija[indice] = result;
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
    this.consulta = {
      where: this.queryParams.where,
      skip: this.queryParams.skip,
      take: this.rows,
      order: {
        id: 'DESC',
      }
    };
    this._rentaFijaRestService.findAll(JSON.stringify(this.consulta))
      .subscribe(
        (respuesta: [RentaFijaInterface[], number]) => {
          this.rentaFija = respuesta[0];
          this.totalRecords = respuesta[1];
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
    const papelRentaFijaEnArreglo = this.rentaFija.find(
      papelesRentaFija => registro.id === papelesRentaFija.id,
    );
    const indicePapelRentaFija = this.rentaFija.indexOf(papelRentaFijaEnArreglo);
    this._rentaFijaRestService.updateOne(registro.id, {habilitado}).subscribe(
      () => {
        this.rentaFija[indicePapelRentaFija].habilitado = habilitado
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

  buscarPorEstado(evento) {
    this.queryParams.where = evento ? {habilitado: evento.valor} : {};
    this.queryParams.skip = 0;
    this.buscar();
  }

  buscarPorTipo(evento) {
    this.queryParams.where = evento ? {tipoValor: evento.valor} : {};
    this.queryParams.skip = 0;
    this.buscar();
  }
}
