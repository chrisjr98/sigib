import { Component, OnInit } from '@angular/core';
import { ActorInterface } from '../../interface/actor.interace';
import { ActorService } from 'src/app/servicios/actor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actor-detalle',
  templateUrl: './actor-detalle.component.html',
  styleUrls: ['./actor-detalle.component.css']
})
export class ActorDetalleComponent implements OnInit {

  actor: ActorInterface;

  idPelicula: string;

  constructor(private readonly _actorService: ActorService,
              private readonly _router: Router,
              private readonly _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((parametrosRuta) => {
      const idActor = parametrosRuta.get('id');
      this.idPelicula = parametrosRuta.get('idPelicula');
      this._actorService.obtenerUno(+idActor).subscribe((resultado: any) => {
        this.actor = resultado;
        console.log(this.actor);
      }, (error) => {
        console.error('error obteniendo la actor', error);
      });
    });
  }

  cancelar() {
    this._router.navigate(['/aplicacion', 'actor', 'listar', this.idPelicula, {resaltado: this.actor.id}]);
  }

}
