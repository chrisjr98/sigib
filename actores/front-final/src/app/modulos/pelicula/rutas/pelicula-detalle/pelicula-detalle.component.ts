import { Component, OnInit } from '@angular/core';
import { PeliculaInterface } from '../../interfaces/pelicula.interface';
import { PeliculaService } from 'src/app/servicios/pelicula.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pelicula-detalle',
  templateUrl: './pelicula-detalle.component.html',
  styleUrls: ['./pelicula-detalle.component.css']
})
export class PeliculaDetalleComponent implements OnInit {

  pelicula: PeliculaInterface;

  constructor(private readonly _peliculaService: PeliculaService,
              private readonly _router: Router,
              private readonly _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((parametrosRuta) => {
      const idPelicula = parametrosRuta.get('id');
      this._peliculaService.obtenerUno(+idPelicula).subscribe((resultado: any) => {
        this.pelicula = resultado;
        console.log(this.pelicula);
      }, (error) => {
        console.error('error obteniendo la pelicula', error);
      });
    });
  }

  cancelar() {
    this._router.navigate(['/aplicacion', 'pelicula', 'listar', {resaltado: this.pelicula.id}]);
  }


}
