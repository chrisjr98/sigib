import { Component, OnInit } from '@angular/core';
import { CarreraInterface } from 'src/app/interfaces/interfaces/carrera.interface';
import { OPCIONES_HABILITADO_SELECT } from 'src/app/constantes/opciones-habilitado-select';
import { ESTADOS } from 'src/app/constantes/estados';
import { NUMERO_FILAS_TABLAS } from 'src/app/constantes/numero-filas-tablas';
import { QueryParamsInterface } from 'src/app/interfaces/interfaces/query-params.interface';
import { CrearEditarCarreraComponent } from '../../modales/crear-editar-carrera/crear-editar-carrera.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CargandoService } from 'src/app/servicios/cargando-service/cargando-service';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-ruta-gestion-carreras',
  templateUrl: './ruta-gestion-carreras.component.html',
  styleUrls: ['./ruta-gestion-carreras.component.scss']
})
export class RutaGestionCarrerasComponent implements OnInit {



  carreras: CarreraInterface[] = [
    {
      codigo: 'COS01',
      nombre: 'Cosmetología',
      duracion:'4 semestres'
    }
  ];
  opcionesHabilitado = OPCIONES_HABILITADO_SELECT;
  estados = ESTADOS;
  columnas = [
    {field: 'codigo', header: 'Codigo', width: '20%'},
    {field: 'nombre', header: 'Nombre', width: '40%'},
    {field: 'duracion', header: 'Duración', width: '40%'},
    {field: 'acciones', header: 'Acciones', width: '40%'},
  ];
  rows = NUMERO_FILAS_TABLAS;
  totalRecords: number;
  loading: boolean;
  queryParams: QueryParamsInterface = {};
  busqueda = '';
  estado;
  ruta = [];

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly  _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    public dialogo: MatDialog,
  ) {
  }

  ngOnInit() {
    this._activatedRoute.queryParams
      .subscribe(
        queryParams => {
          this.queryParams.skip = queryParams.skip ? +queryParams.skip : 0;
          this.queryParams.where = queryParams.where ? JSON.parse(queryParams.where) : {};
          this.queryParams.where.tipo = this.queryParams.where.tipo ? this.queryParams.where.tipo : undefined;
          // tslint:disable-next-line:max-line-length
          this.queryParams.where.habilitado = this.queryParams.where.habilitado === 0 || this.queryParams.where.habilitado === 1 ? this.queryParams.where.habilitado : undefined;
          this.queryParams.where.nivelJuego = this.queryParams.where.nivelJuego ? this.queryParams.where.nivelJuego : undefined;
        }, error => {
          console.error('Error en acceder a la ruta');
        });
  }

  actualizarEstado(registro) {
  }

  buscarPorNombre(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.queryParams.where = this.busqueda === '' ? {} : {titulo: this.busqueda};
    //this.buscar(this.queryParams.skip);
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    const seBuscoPorTipo = this.queryParams.where.tipo;
    const seBuscoPorEstado = this.queryParams.where.habilitado === 1 || this.queryParams.where.habilitado === 0;
    const seBuscoPorNivel = this.queryParams.where.nivelJuego;
    const seBuscoPorTipoEstadoNivel = seBuscoPorTipo || seBuscoPorEstado || seBuscoPorNivel;
  }

  buscar(skip: number) {
    const consulta = {
      where: this.queryParams.where,
      relations: ['tipo', 'nivelJuego'],
      skip,
      take: this.rows,
      order: {id: 'DESC'}
    };
  }

  abrirDialogo(rolSeleccionado?): void {
    const dialogRef = this.dialogo.open(
      CrearEditarCarreraComponent,
      {
        data: {rol: rolSeleccionado},
      }
    );
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$
      .subscribe((registroCreado: CarreraInterface) => {
        if (registroCreado) {
          if (rolSeleccionado) {
            const indiceRegistro = this.carreras.indexOf(rolSeleccionado);
            this.carreras[indiceRegistro] = registroCreado;
          } else {
            this.carreras.unshift(registroCreado);
          }
        }
      });

  }
    irNoticiasEmisor(idCarrera: number) {
    this._router.navigate(['administrador', 'menu', 'academico', 'menu-academico', 'carreras', idCarrera, 'materias']);
  }

}