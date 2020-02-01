import {Component, OnInit} from '@angular/core';
import {NoticiaRestService} from '../../../../servicios/rest/servicios/noticia-rest.service';
import {NoticiaInterface} from '../../../../interfaces/interfaces/noticia.interface';
import {ESTADOS} from '../../../../constantes/estados';
import {ActivatedRoute, Router} from '@angular/router';
import {QueryParamsInterface} from '../../../../interfaces/interfaces/query-params.interface';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material/dialog';
import {CrearEditarNoticiaComponent} from '../../modales/crear-editar-noticia/crer-editar-noticia.component';
import {TipoNoticiaRestService} from '../../../../servicios/rest/servicios/tipo-noticia-rest.service';
import {TipoNoticiaInterface} from '../../../../interfaces/interfaces/tipo-noticia.interface';
import {NivelJuegoRestService} from '../../../../servicios/rest/servicios/nivel-juego-rest.service';
import {NivelJuegoInterface} from '../../../../interfaces/interfaces/nivel-juego.interface';
import {OPCIONES_HABILITADO_SELECT} from '../../../../constantes/opciones-habilitado-select';
import {NUMERO_FILAS_TABLAS} from '../../../../constantes/numero-filas-tablas';

@Component({
  selector: 'app-ruta-gestion-noticias',
  templateUrl: './ruta-gestion-noticias.component.html',
  styleUrls: ['./ruta-gestion-noticias.component.scss']
})
export class RutaGestionNoticiasComponent implements OnInit {

  noticias: NoticiaInterface[];
  tiposNoticias: TipoNoticiaInterface[];
  opcionesHabilitado = OPCIONES_HABILITADO_SELECT;
  nivelesJuego: NivelJuegoInterface[];
  estados = ESTADOS;
  columnas = [
    {field: 'titulo', header: 'Título', width: '20%'},
    {field: 'descripcion', header: 'Descripción', width: '40%'},
    {field: 'tipo', header: 'Tipo', width: '10%'},
    {field: 'nivel', header: 'Nivel', width: '10%'},
    {field: 'habilitado', header: 'Estado', width: '10%'},
    {field: 'acciones', header: 'Acciones', width: '10%'},
  ];
  rows = NUMERO_FILAS_TABLAS;
  totalRecords: number;
  loading: boolean;
  queryParams: QueryParamsInterface = {};
  busqueda = '';
  tipo;
  nivel;
  estado;
  ruta = [];

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _noticiaService: NoticiaRestService,
    // tslint:disable-next-line:variable-name
    private readonly _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly  _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    // tslint:disable-next-line:variable-name
    private readonly _tipoNoticiaService: TipoNoticiaRestService,
    // tslint:disable-next-line:variable-name
    private readonly _nivelJuegoRestService: NivelJuegoRestService,
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
    this.cargarTiposNoticia();
    this.cargarNiveles();
  }

  actualizarEstado(registro) {
    this._cargandoService.habilitarCargando();
    const habilitado = registro.habilitado === ESTADOS.Inactivo;
    const noticiaEnArreglo = this.noticias.find(
      noticia => registro.id === noticia.id,
    );
    const indiceNoticia = this.noticias.indexOf(noticiaEnArreglo);
    this._noticiaService.updateOne(registro.id, {habilitado}).subscribe(
      () => {
        this.noticias[indiceNoticia].habilitado = habilitado
          ? ESTADOS.Activo
          : ESTADOS.Inactivo;
        this._toasterService.pop('success', 'Éxito', 'La noticia se ha editado correctamente');
        this._cargandoService.deshabilitarCargando();
      },
      error => {
        console.error(error);
        this._cargandoService.deshabilitarCargando();
        this._toasterService.pop('error', 'Error', 'Error al editar la noticia');
      },
    );
  }

  buscarPorNombre(busqueda: string) {
    this.busqueda = busqueda.trim();
    this.queryParams.where = this.busqueda === '' ? {} : {titulo: this.busqueda};
    this.buscar(this.queryParams.skip);
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    const seBuscoPorTipo = this.queryParams.where.tipo;
    const seBuscoPorEstado = this.queryParams.where.habilitado === 1 || this.queryParams.where.habilitado === 0;
    const seBuscoPorNivel = this.queryParams.where.nivelJuego;
    const seBuscoPorTipoEstadoNivel = seBuscoPorTipo || seBuscoPorEstado || seBuscoPorNivel;
    if (seBuscoPorTipoEstadoNivel) {
      this.buscarPorTipoEstadoNivel(this.queryParams.skip);
    } else {
      this.buscar(this.queryParams.skip);
    }
  }

  buscar(skip: number) {
    const consulta = {
      where: this.queryParams.where,
      relations: ['tipo', 'nivelJuego'],
      skip,
      take: this.rows,
      order: {id: 'DESC'}
    };
    this._noticiaService.obtenerNoticiasLike(consulta)
      .subscribe(
        (respuesta: [NoticiaInterface[], number]) => {
          this.noticias = respuesta[0];
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

  abrirDialogo(noticiaSeleccionada?): void {
    const dialogRef = this.dialogo.open(
      CrearEditarNoticiaComponent,
      {
        data: {noticia: noticiaSeleccionada},
      }
    );
    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$
      .subscribe((registroCreado: NoticiaInterface) => {
        if (registroCreado) {
          if (noticiaSeleccionada) {
            const indiceRegistro = this.noticias.indexOf(noticiaSeleccionada);
            this.noticias[indiceRegistro] = registroCreado;
          } else {
            this.noticias.unshift(registroCreado);
          }
        }
      });

  }


  private cargarTiposNoticia() {
    this._tipoNoticiaService.findAll()
      .subscribe(
        (respuesta: [TipoNoticiaInterface[], number]) => {
          this.tiposNoticias = respuesta[0];
        }
        , error => {
          console.error(error);
          this._toasterService.pop('error', 'Error', 'Error al cargar los tipo de noticias');
        }
      );
  }

  private cargarNiveles() {
    this._nivelJuegoRestService.findAll()
      .subscribe(
        (respuesta: [NivelJuegoInterface[], number]) => {
          this.nivelesJuego = respuesta[0];
        }
        , error => {
          console.error(error);
          this._toasterService.pop('error', 'Error', 'Error al cargar los niveles de juego');
        }
      );
  }

  buscarPorTipoNoticia(evento) {
    this.queryParams.where.tipo = evento ? evento.id : undefined;
    this.queryParams.skip = 0;
    this.buscarPorTipoEstadoNivel(this.queryParams.skip);
  }

  buscarPorNivel(evento) {
    this.queryParams.where.nivelJuego = evento ? evento.id : undefined;
    this.queryParams.skip = 0;
    this.buscarPorTipoEstadoNivel(this.queryParams.skip);
  }

  buscarPorEstado(evento) {
    this.queryParams.where.habilitado = evento ? evento.valor : undefined;
    this.queryParams.skip = 0;
    this.buscarPorTipoEstadoNivel(this.queryParams.skip);
  }

  buscarPorTipoEstadoNivel(skip) {
    this.queryParams.where = {
      tipo: this.queryParams.where.tipo,
      nivelJuego: this.queryParams.where.nivelJuego,
      habilitado: this.queryParams.where.habilitado
    };
    const consulta = {
      where: this.queryParams.where,
      relations: ['tipo', 'nivelJuego'],
      skip,
      take: this.rows,
      order: {id: 'DESC'}
    };
    this._noticiaService.obtenerNoticiasLike(consulta)
      .subscribe(
        (respuesta: [NoticiaInterface[], number]) => {
          this.noticias = respuesta[0];
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
}