import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NoticiaEmisorInterface} from '../../../../interfaces/interfaces/noticia-emisor.interface';
import {
  OPCIONES_ES_POSITIVA_SELECT,
} from '../../../../constantes/opciones-habilitado-select';
import {ESTADOS} from '../../../../constantes/estados';
import {NUMERO_FILAS_TABLAS} from '../../../../constantes/numero-filas-tablas';
import {QueryParamsInterface} from '../../../../interfaces/interfaces/query-params.interface';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';
import {NoticiaEmisorRestService} from '../../../../servicios/rest/servicios/noticia-emisor-rest.service';
import {mergeMap} from 'rxjs/operators';
import {NoticiaRestService} from '../../../../servicios/rest/servicios/noticia-rest.service';
import {TipoNoticiaInterface} from '../../../../interfaces/interfaces/tipo-noticia.interface';
import {NivelJuegoInterface} from '../../../../interfaces/interfaces/nivel-juego.interface';
import {TipoNoticiaRestService} from '../../../../servicios/rest/servicios/tipo-noticia-rest.service';
import {NivelJuegoRestService} from '../../../../servicios/rest/servicios/nivel-juego-rest.service';
import {EmisorRestService} from '../../../../servicios/rest/servicios/emisor-rest.service';
import {EmisorInterface} from '../../../../interfaces/interfaces/emisor.interface';
import {AsignarNoticiasEmisorComponent} from '../../modales/asignar-noticias-emisor/asignar-noticias-emisor.component';
import {MatDialog} from '@angular/material';
import {TipoNoticias} from '../../../../enums/tipo-noticias';

@Component({
  selector: 'app-ruta-gestion-noticias-emisor',
  templateUrl: './ruta-gestion-noticias-emisor.component.html',
  styleUrls: ['./ruta-gestion-noticias-emisor.component.scss']
})
export class RutaGestionNoticiasEmisorComponent implements OnInit {

  idEmisor: number;
  noticiasEmisor: NoticiaEmisorInterface[];
  opcionesEspositiva = OPCIONES_ES_POSITIVA_SELECT;
  tiposNoticias: TipoNoticiaInterface[];
  nivelesJuego: NivelJuegoInterface[];
  estados = ESTADOS;
  padre: EmisorInterface;
  columnas = [
    {field: 'titulo', header: 'Título', width: '20%'},
    {field: 'descripcion', header: 'Descripción', width: '40%'},
    {field: 'tipo', header: 'Tipo', width: '10%'},
    {field: 'nivelJuego', header: 'Nivel', width: '10%'},
    {field: 'esPositiva', header: 'Acción', width: '10%'},
  ];
  rows = NUMERO_FILAS_TABLAS;
  totalRecords: number;
  loading: boolean;
  queryParams: QueryParamsInterface = {};
  busqueda = '';
  ruta = [];
  nombreEmisor = '';
  tiposNoticia = TipoNoticias;
  // tslint:disable-next-line:variable-name
  constructor(
    public dialog: MatDialog,
    // tslint:disable-next-line:variable-name
    private _activatedRoute: ActivatedRoute,
    // tslint:disable-next-line:variable-name
    private readonly _noticiaEmisorService: NoticiaEmisorRestService,
    // tslint:disable-next-line:variable-name
    private readonly  _router: Router,
    // tslint:disable-next-line:variable-name
    private readonly _cargandoService: CargandoService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    // tslint:disable-next-line:variable-name
    private readonly _noticiasSevice: NoticiaRestService,
    // tslint:disable-next-line:variable-name
    private readonly _tipoNoticiaService: TipoNoticiaRestService,
    // tslint:disable-next-line:variable-name
    private readonly _nivelJuegoRestService: NivelJuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _emisorService: EmisorRestService,
  ) {
  }

  ngOnInit() {
    this._activatedRoute.paramMap
      .pipe(
        mergeMap(parametros => {
            this.idEmisor = +parametros.get('id');
            this._emisorService
              .findOne(this.idEmisor).subscribe(
              emisor => {
                this.nombreEmisor = emisor.nombre;
              }
            );
            this.ruta = ['../administrador', 'menu', 'configuraciones', 'menu-ajustes', 'emisores', this.idEmisor, 'noticias'];
            return this._activatedRoute.queryParams;
          }
        )
      )
      .subscribe(
        queryParams => {
          this.queryParams.skip = queryParams.skip ? +queryParams.skip : 0;
          this.queryParams.where = queryParams.where ? JSON.parse(queryParams.where) : {emisor: this.idEmisor};
          // tslint:disable-next-line:max-line-length
          this.queryParams.where.esPositiva = this.queryParams.where.esPositiva === 0 || this.queryParams.where.esPositiva === 1 ? this.queryParams.where.esPositiva : undefined;
          this.queryParams.where.nivel = this.queryParams.where.nivel ? this.queryParams.where.nivel : undefined;
          this.queryParams.where.busqueda = this.queryParams.where.busqueda ? this.queryParams.where.busqueda : undefined;

        }, error => {
          console.error('Error en acceder a la ruta', error);
        }
      );
    this.cargarTiposNoticia();
    this.cargarNiveles();
  }

  actualizarEstado(registro) {
    this._cargandoService.habilitarCargando();
    const esPositiva = registro.esPositiva === ESTADOS.Negativa;
    const noticiaEnArreglo = this.noticiasEmisor.find(
      noticia => registro.id === noticia.id,
    );
    const indiceNoticia = this.noticiasEmisor.indexOf(noticiaEnArreglo);
    this._noticiaEmisorService.updateOne(registro.id, {esPositiva}).subscribe(
      () => {
        this.noticiasEmisor[indiceNoticia].esPositiva = esPositiva
          ? ESTADOS.Positiva
          : ESTADOS.Negativa;
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
    if (busqueda === '') {
      this.queryParams.where = {
        emisor: this.idEmisor,
      };
      this.buscar(this.queryParams.skip);
    } else {
      const consulta = {
        idEmisor: this.idEmisor,
        busqueda: this.busqueda,
        skip: this.queryParams.skip,
        take: NUMERO_FILAS_TABLAS,
      };
      this.queryParams.where = consulta;
      this._noticiaEmisorService.obtenerNoticiaEmisorTitulo(consulta)
        .subscribe(
          (respuesta: [NoticiaEmisorInterface[], number]) => {
            this.noticiasEmisor = respuesta[0];
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
            this._toasterService.pop('error', 'Error', 'Error al noticias por emisor');
          }
        );
    }
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    const seBuscoPorEsPositiva = this.queryParams.where.esPositiva === 1 || this.queryParams.where.esPositiva === 0;
    const seBuscoPorNivel = this.queryParams.where.nivel;
    const seBuscoPorEsPostivaNivel = seBuscoPorEsPositiva || seBuscoPorNivel;
    const seBuscoPorNombre = this.queryParams.where.busqueda;
    if (seBuscoPorEsPostivaNivel) {
      this.buscarPorEsPositivaNivel(this.queryParams.skip);
    }
    if (seBuscoPorNombre) {
      this.buscarPorNombre(this.queryParams.where.busqueda);
    }
    if (!seBuscoPorEsPostivaNivel && !seBuscoPorNombre) {
      this.buscar(this.queryParams.skip);
    }
  }

  buscarPorTitulo(valor) {
    this.queryParams.skip = 0;
    this.buscarPorNombre(valor);
  }

  buscar(skip: number) {
    const consulta = {
      where: this.queryParams.where,
      relations: ['noticia', 'noticia.tipo', 'noticia.nivelJuego'],
      skip,
      take: this.rows,
      order: {id: 'DESC'}
    };
    this._noticiaEmisorService.findAll(JSON.stringify(consulta))
      .subscribe(
        (respuesta: [NoticiaEmisorInterface[], number]) => {
          this.noticiasEmisor = respuesta[0];
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
          this._toasterService.pop('error', 'Error', 'Error al noticias por emisor');
        }
      );
  }

  buscarPorEsPositiva(evento) {
    this.queryParams.where.esPositiva = evento  ? evento.valor : undefined;
    this.queryParams.skip = 0;
    this.buscarPorEsPositivaNivel(this.queryParams.skip);
  }

  buscarPorNivel(evento) {
    this.queryParams.where.nivel = evento ? evento.id : undefined;
    this.queryParams.skip = 0;
    this.buscarPorEsPositivaNivel(this.queryParams.skip);
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

  abrirModalAsignarNoticias() {
    const dialogRef = this.dialog.open(AsignarNoticiasEmisorComponent, {
      width: '900px',
      data: {
        emisor: this.idEmisor,
      },
    });

    const resultadoModal$ = dialogRef.afterClosed();
    resultadoModal$
      .subscribe((registroCreado: NoticiaEmisorInterface []) => {
        if (registroCreado) {
          registroCreado.forEach(r => {
            this.noticiasEmisor.unshift(r);
          });
          this.noticiasEmisor = [...this.noticiasEmisor];
        }
      });
  }

  private buscarPorEsPositivaNivel(skip: number) {
    const consulta = {
      emisor: this.idEmisor,
      nivel:  this.queryParams.where.nivel,
      skip: this.queryParams.skip,
      take: NUMERO_FILAS_TABLAS,
      esPositiva:  this.queryParams.where.esPositiva,
    };
    this.queryParams.where = consulta;
    this._noticiaEmisorService.obtenerNoticiaEmisorNivel(consulta)
      .subscribe(
        (respuesta: [NoticiaEmisorInterface[], number]) => {
          this.noticiasEmisor = respuesta[0];
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
          this._toasterService.pop('error', 'Error', 'Error al noticias por emisor');
        }
      );
  }
}
