import { Component, OnInit } from '@angular/core';
import { PeliculaInterface } from '../../interfaces/pelicula.interface';
import { PeliculaService } from 'src/app/servicios/pelicula.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { FormBuilder } from '@angular/forms';
import { toastEditar, toastErrorEditar } from 'src/app/shared/toaster';

@Component({
  selector: 'app-pelicula-editar',
  templateUrl: './pelicula-editar.component.html',
  styleUrls: ['./pelicula-editar.component.css']
})
export class PeliculaEditarComponent implements OnInit {
  peliculaEditar: PeliculaInterface;

  botonEditarDisable = true;

  pelicula: PeliculaInterface;

  constructor(private readonly _peliculaService: PeliculaService,
              private readonly _router: Router,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _toastService: ToasterService,
              private readonly _formBuilder: FormBuilder) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((parametrosRuta) => {
      const idPelicula = parametrosRuta.get('id');
      this._peliculaService.obtenerUno(+idPelicula).subscribe((peliculaResultado: any) => {
        this.pelicula = peliculaResultado;
      }, (error) => {
        console.error('error obteniendo la pelicula', error);
      });
    });
  }

  editar() {
    this._peliculaService.editar(+this.pelicula.id, this.peliculaEditar)
      .subscribe((resultado) => {
        console.log(this.pelicula.id);
        console.log('se creo exitosamente', resultado);
        this._toastService.pop(toastEditar);
        this._router.navigate(['/aplicacion', 'pelicula', 'listar', {resaltado: this.pelicula.id}]);
      }, (error) => {
        console.log('error creando :(', error);
        this._toastService.pop(toastErrorEditar);
      });
  }

  cancelar() {
    this._router.navigate(['/aplicacion', 'pelicula', 'listar', {resaltado: this.pelicula.id}]);
  }

  formularioEsValido(pelicula: PeliculaInterface) {

    const seEdito = ((pelicula.rating !== this.pelicula.rating) ||
                    (pelicula.premios !== this.pelicula.premios) ||
                    (pelicula.taquilla !== this.pelicula.taquilla))
                    && pelicula;
    if (seEdito) {
      this.botonEditarDisable = false;
      this.peliculaEditar = pelicula;
    } else {
      this.botonEditarDisable = true;
    }
  }

}
