import { Component, OnInit } from '@angular/core';
import { NUMERO_FILAS_TABLAS } from 'src/app/constantes/numero-filas-tablas';
import { QueryParamsInterface } from 'src/app/interfaces/interfaces/query-params.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { MatDialog } from '@angular/material';
import { MatriculaRestService } from 'src/app/servicios/rest/servicios/matricula-rest.service';
import { MatriculaInterface } from 'src/app/interfaces/interfaces/matricula.interface';

@Component({
  selector: 'app-ruta-ver-horarios',
  templateUrl: './ruta-ver-horarios.component.html',
  styleUrls: ['./ruta-ver-horarios.component.scss']
})
export class RutaVerHorariosComponent implements OnInit { 
  
  matriculas: MatriculaInterface[];
  columnas = [
    { field: "horario", header: "Horario", width: "20%" },
    { field: "grupo", header: "Grupo", width: "20%" },
    { field: "aula", header: "Aula", width: "20%" },
    { field: "profesor", header: "Profesor", width: "20%" },
    { field: "materia", header: "Materia", width: "20%" },
  ];

  rows = NUMERO_FILAS_TABLAS;

  totalRecords: number;
  loading: boolean;
  queryParams: QueryParamsInterface = {};
  busqueda = "";
  ruta = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _toasterService: ToasterService,
    public dialogo: MatDialog,
    private readonly _matriculaService: MatriculaRestService,
  ) {}

  ngOnInit() {}

  cargarDatosLazy(event) {
    this.loading = true;
    this.queryParams.skip = event.first;
    this.buscar(this.queryParams.skip);
  }
/*public findWhereOr(criterioBusqueda, cabeceras?: { headers: HttpHeaders }): Observable<[Entidad[], number]> {
    const url = this.url + ':' + this.port  + '/' + this.segmento + '/findWhereOr' + '?' + JSON.stringify(criterioBusqueda);
    let cabecerasDePeticion;
    if (cabeceras) {
      cabecerasDePeticion = JSON.parse(JSON.stringify(this.cabecerasGenerales));
      cabecerasDePeticion.headers = {...cabecerasDePeticion.headers, ...cabeceras.headers};
    } */
  buscar(skip: number) {
    const consulta = {
      relations: ['estudiante', 'curso','curso.profesor','curso.materia'],
      skip,
      take: this.rows,
      order: { id: 'DESC' }
    };
    this._matriculaService.findAll(JSON.stringify(consulta), ).subscribe(
      (respuesta: [MatriculaInterface[], number]) => {
        this.matriculas = respuesta[0];
        this.totalRecords = respuesta[1];
        console.log('datos de la base', this.matriculas);
        this.loading = false;
        this._router.navigate(this.ruta, {
          queryParams: {
            skip: this.queryParams.skip,
            where: JSON.stringify(this.queryParams.where)
          }
        });
      },
      error => {
        this.loading = false;
        console.error("Error en el servidor", error);
        this._toasterService.pop(
          "error",
          "Error",
          "Error al cargar materias de la carrera"
        );
      }
    );
  }

}
