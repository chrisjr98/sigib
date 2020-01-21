import { Component, OnInit } from '@angular/core';
import { ActorInterface } from '../../interface/actor.interace';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ActorService } from 'src/app/servicios/actor.service';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { toastEditar, toastErrorEditar } from 'src/app/shared/toaster';
import { LIMITE_PAGINACION } from '../../../../constantes/paginacion';

@Component({
  selector: 'app-actor-listar',
  templateUrl: './actor-listar.component.html',
  styleUrls: ['./actor-listar.component.css']
})
export class ActorListarComponent implements OnInit {
  resaltado: number;

  widthEstado = '15%';

  palabraBuscada = '';

  columnas;

  loading: boolean;

  totalActores: number;

  actores: ActorInterface[] = [];

  actorSeleccionado: ActorInterface;

  displayDialog: boolean;

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;

  idPelicula: string;

  filas = LIMITE_PAGINACION;

  constructor(private readonly _actorService: ActorService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _toastService: ToasterService) { }

  ngOnInit() {

    // this.loading = true;
    // this.obtenerParametros();

    this.columnas = [
      { field: 'nombre', header: 'Nombre', width: '25%' },
      { field: 'pais', header: 'pais', width: '20%' },
      { field: 'premios', header: 'premios', width: '10%' },
    ];

    this.loading = true;
  }


  loadData(event) {
    this.loading = true;
    this.obtenerParametros(() => {
      this.contarActores();
      this._actorService.buscarActoresPorPeli(+this.idPelicula, event.first, this.filas, this.palabraBuscada)
        .subscribe((actores) => {
          this.actores = actores;
          this.loading = false;
        },
          (error) => {
            console.log(error);
            this.actores = [];
            this.loading = false;
          });
    });
  }

  buscar() {
    this.loading = true;
    this._actorService.contarBuscadosPorPeli(+this.idPelicula, this.palabraBuscada)
      .subscribe((contados => {
        this.totalActores = contados;
      }));

    this._actorService.buscarActoresPorPeli(+this.idPelicula, 0, this.filas, this.palabraBuscada)
      .subscribe((peliculas) => {
        this.actores = peliculas;
        this.loading = false;
      },
        (error) => {
          this.actores = [];
          this.loading = false;
        });
  }

  activarDesactivar(id: number) {
    this._actorService.activarDesactivar(id)
      .subscribe((resultado) => {
        this._toastService.pop(toastEditar);
        this.buscar();
      },
        (error) => {
          this._toastService.pop(toastErrorEditar);
        });
  }

  obtenerParametros(callback) {
    this._activatedRoute.paramMap
      .subscribe((parametros) => {
        this.idPelicula = parametros.get('idPelicula');
        this.resaltado = +parametros.get('resaltado');
        callback();
      });
  }

  contarActores() {
    this._actorService.contarBuscadosPorPeli(+this.idPelicula, '')
      .subscribe((contados => {
        this.totalActores = contados;
      }));
  }
}
