import { Component, OnInit } from '@angular/core';
import { PeliculaInterface } from '../../interfaces/pelicula.interface';
import { SelectItem } from 'primeng/components/common/selectitem';
import { PeliculaService } from 'src/app/servicios/pelicula.service';
import { ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { toastEditar, toastErrorEditar } from 'src/app/shared/toaster';
import { LIMITE_PAGINACION } from '../../../../constantes/paginacion';

@Component({
  selector: 'app-pelicula-listar',
  templateUrl: './pelicula-listar.component.html',
  styleUrls: ['./pelicula-listar.component.css']
})
export class PeliculaListarComponent implements OnInit {

    resaltado: number;

    widthEstado = '15%';

    widthOpciones = '45%';

    palabraBuscada = '';

    columnas;

    loading: boolean;

    totalPeliculas: number;

    peliculas: PeliculaInterface[] = [ {
        nombre: 'forest gump',
        anioProduccion: 2013,
        genero: 'comedia',
        premios: 17,
        rating: 5,
        taquilla: 10000000

    }];

    peliculaSeleccionada: PeliculaInterface;

    displayDialog: boolean;

    sortOptions: SelectItem[];

    sortKey: string;

    sortField: string;

    sortOrder: number;

    filas = LIMITE_PAGINACION;

    constructor(private readonly _peliculaService: PeliculaService,
                private readonly _activatedRoute: ActivatedRoute,
                private readonly _toastService: ToasterService) { }

    ngOnInit() {

        // this.loading = true;
        this._activatedRoute.paramMap
        .subscribe((parametros) => {
            this.resaltado = +parametros.get('resaltado');
        });

        this._peliculaService.contarTodos()
        .subscribe((contados => {
            this.totalPeliculas = contados;
        }));

        // this._peliculaService.obtenerTodos({skip: 0, take: 5})
        // .subscribe(peliculas => {
        //     this.peliculas = peliculas;
        // });

        this.columnas = [
            { field: 'nombre', header: 'Nombre', width: '15%' },
            { field: 'rating', header: 'Rating', width: '15%' },
            { field: 'genero', header: 'Genero', width: '20%' },
        ];

        this.loading = true;
    }


    loadData(event) {
        this.loading = true;
        this._peliculaService.buscar({patron: this.palabraBuscada, skip: event.first, take: this.filas})
        .subscribe((peliculas) => {
            this.peliculas = peliculas;
            this.loading = false;
        });
    }

    buscar() {
        this.loading = true;
        this._peliculaService.contarBuscados(this.palabraBuscada)
            .subscribe((contados => {
                this.totalPeliculas = contados;
                this._peliculaService.buscar({ patron: this.palabraBuscada, skip: 0, take: this.filas })
                    .subscribe((peliculas) => {
                        this.peliculas = peliculas;
                        this.loading = false;
                    });
            }));
    }

    activarDesactivar(id: number) {
        this._peliculaService.activarDesactivar(id)
        .subscribe((resultado) => {
            this._toastService.pop(toastEditar);
            this.buscar();
        },
        (error) => {
            this._toastService.pop(toastErrorEditar);
        });
    }

}
