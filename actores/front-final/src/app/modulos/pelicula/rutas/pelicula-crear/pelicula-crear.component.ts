import { Component, OnInit } from '@angular/core';
import { PeliculaInterface } from '../../interfaces/pelicula.interface';
import { PeliculaService } from 'src/app/servicios/pelicula.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { toastCrear, toastErrorCrear } from 'src/app/shared/toaster';

@Component({
  selector: 'app-pelicula-crear',
  templateUrl: './pelicula-crear.component.html',
  styleUrls: ['./pelicula-crear.component.css']
})
export class PeliculaCrearComponent implements OnInit {

  peliculaCrear: PeliculaInterface;

  crearDisable = true;

  constructor(private readonly _peliculaService: PeliculaService,
              private readonly _router: Router,
              private  readonly _toastService: ToasterService) { }

  ngOnInit() {
  }

  crear() {
    this._peliculaService.crear(this.peliculaCrear).subscribe((resultado: any) => {
      console.log('se creo exitosamente', resultado);
      this._toastService.pop(toastCrear);
      this._router.navigate(['/aplicacion', 'pelicula', 'listar', {resaltado: resultado.id}]);
    }, (error) => {
      console.log('error creando :(', error);
      this._toastService.pop(toastErrorCrear);
    });
  }

  cancelar() {
    this._router.navigate(['/aplicacion', 'pelicula', 'listar']);
  }

  formularioEsValido(productora: PeliculaInterface) {
    if (productora) {
      this.peliculaCrear = productora;
      this.crearDisable = false;
    } else {
      this.crearDisable = true;
    }
  }


}
