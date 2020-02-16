import { Component, OnInit } from '@angular/core';
import {NUMERO_FILAS_TABLAS} from '../../../../constantes/numero-filas-tablas';
import {QueryParamsInterface} from '../../../../interfaces/interfaces/query-params.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {CargandoService} from '../../../../servicios/cargando-service/cargando-service';
import {ToasterService} from 'angular2-toaster';
import {MatDialog} from '@angular/material';
import {CursoInterface} from '../../../../interfaces/interfaces/curso.interface';
import {CursoRestService} from '../../../../servicios/rest/servicios/curso-rest.service';
import {EstudianteRestService} from '../../../../servicios/rest/servicios/estudiante-rest.service';
import {RegistroNotaRestService} from '../../../../servicios/rest/servicios/registro-nota-rest.service';
import {MatriculaRestService} from '../../../../servicios/rest/servicios/matricula-rest.service';
import {EstudianteInterface} from '../../../../interfaces/interfaces/estudiante.interface';
import {FormControl} from '@angular/forms';
import {VALIDACION_NOTA} from '../../../../constantes/validaciones-formulario/validacion-input';
import {debounceTime} from 'rxjs/operators';
import {RegistroNotaInterface} from '../../../../interfaces/interfaces/registro-nota.interface';

@Component({
  selector: 'app-ruta-ingreso-notas',
  templateUrl: './ruta-ingreso-notas.component.html',
  styleUrls: ['./ruta-ingreso-notas.component.scss']
})
export class RutaIngresoNotasComponent implements OnInit {

  idCurso: number;
  padre: CursoInterface;
  notas: any[];
  check = false;
  columnas = [
    {field: 'cedula', header: 'Cédula', width: '10%'},
    {field: 'nombre', header: 'Nombre', width: '20%'},
    {field: 'notaPrimerQuimestre', header: 'Nota 1 Quimestre ', width: '20%'},
    {field: 'notaSegundoQuimestre', header: 'Nota 2 Quimestre', width: '20%'},
    {field: 'acciones', header: 'Acciones', width: '20%'},
  ];
  rows = NUMERO_FILAS_TABLAS;
  totalRecords: number;
  loading: boolean;
  queryParams: QueryParamsInterface = {};
  busqueda = '';
  ruta = [];
  nombreCurso = '';
  notaControl = new FormControl('', VALIDACION_NOTA);

  constructor(
    private _activatedRoute: ActivatedRoute,
    private readonly  _router: Router,
    private readonly _cargandoService: CargandoService,
    private readonly _toasterService: ToasterService,
    private readonly _cursoService: CursoRestService,
    private readonly _estudianteService: EstudianteRestService,
    private readonly _registroNotaService: RegistroNotaRestService,
    private readonly _matriculaService: MatriculaRestService,
    public dialogo: MatDialog,
  ) {
    this.notaControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(valor => {
        console.log('adfadf', valor);
      });
  }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe(param => {
      console.log('respuesta', param.get('id'));
      this.idCurso = +param.get('id');
      this._cursoService
        .findOne(this.idCurso).subscribe(
        (curso: CursoInterface) => {
          this.padre = curso;
          this.nombreCurso = curso.id + ' ' + curso.grupo;
        }
      );
    });

  }

  buscarPorNombre(busqueda: string) {
    this.busqueda = busqueda.trim();
    //this.filterpost = this.busqueda;
    // this.queryParams.where = this.busqueda === '' ? {} : {titulo: this.busqueda};
    //this.buscar(this.queryParams.skip);
  }

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.buscar(this.queryParams.skip);
  }

  buscar(skip: number) {
    const consulta = {
      relations: ['estudiante', 'curso'],
      where: {
        curso: {
          id: this.idCurso,
        },
      },
      skip,
      take: this.rows,
      order: {id: 'DESC'}
    };
    this._matriculaService.findAll(JSON.stringify(consulta))
      .subscribe(
        (respuesta: [any[], number]) => {
          this.notas = respuesta[0].map(
            r => {
              const notas = {
                notaSegundoQuimestre: 0,
                notaPrimerQuimestre: 0,
                cedula: (r.estudiante as EstudianteInterface).cedula ,
                nombre: (r.estudiante as EstudianteInterface).nombre + ' ' + (r.estudiante as EstudianteInterface).apellido ,
              };
              return notas;
            }
          );
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
          this._toasterService.pop('error', 'Error', 'Error al cargar materias de la carrera');
        }
      );
  }
  onRowEditInit(book) {
    console.log('Row edit initialized');
  }

  onRowEditSave(item) {
    this._cargandoService.habilitarCargando();
    const valor1 = this.validateDecimal(item.notaPrimerQuimestre);
    const valor2 = this.validateDecimal(item.notaSegundoQuimestre);
    if (valor1 && valor2) {
      console.log('valores', item);
      const consulta = {
        where: {
          cedula: item.cedula,
        }
      };
      this._estudianteService.findAll(JSON.stringify(consulta)).subscribe(
        respuesta => {
          const estudiante = respuesta[0][0];
          const idEstudiante = estudiante.id;
          const registroNotas: RegistroNotaInterface = {
            notaSegundoQuimestre: item.notaSegundoQuimestre,
            notaPrimerQuimestre: item.notaPrimerQuimestre,
            estudiante: idEstudiante,
            curso: this.idCurso,
          };
          this._registroNotaService.create(registroNotas).subscribe(
            r => {
              this._cargandoService.deshabilitarCargando();
              this._toasterService.pop('success', '', 'Nota registrada con éxito');
            }
            , error => {
              this._cargandoService.deshabilitarCargando();
              this._toasterService.pop('error', 'Error', 'No se logro gurdar en la base de datos');
            });
        }
      );
    } else {
      this._cargandoService.deshabilitarCargando();
      this._toasterService.pop('error', 'Error', 'La calificación no es válida  Ej. 0.00 o 10.00');
    }
  }
  onRowEditCancel(book, index: number) {
    console.log('Row edit cancelled');
  }
  validateDecimal(valor) {
    const RE = /^\d*(\.\d{1})?\d{0,1}$/;
    if (RE.test(valor)) {
      return true;
    } else {
      return false;
    }
  }
}
