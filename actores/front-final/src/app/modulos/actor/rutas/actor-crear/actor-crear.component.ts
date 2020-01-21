import { Component, OnInit } from '@angular/core';
import { ActorInterface } from '../../interface/actor.interace';
import { ActorService } from 'src/app/servicios/actor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { toastCrear, toastErrorCrear } from 'src/app/shared/toaster';

@Component({
  selector: 'app-actor-crear',
  templateUrl: './actor-crear.component.html',
  styleUrls: ['./actor-crear.component.css']
})
export class ActorCrearComponent implements OnInit {

  actorCrear: ActorInterface;

  crearDisable = true;

  peliculaId;

  constructor(private readonly _actorService: ActorService,
              private readonly _router: Router,
              private  readonly _toastService: ToasterService,
              private readonly _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.obtenerPeliculaId();
  }

  crear() {
    this._actorService.crear(this.actorCrear).subscribe((resultado: any) => {
      console.log('se creo exitosamente', resultado);
      this._toastService.pop(toastCrear);
      this._router.navigate(['/aplicacion', 'actor', 'listar', this.peliculaId, {resaltado: resultado.id}]);
    }, (error) => {
      console.log('error creando :(', error);
      this._toastService.pop(toastErrorCrear);
    });
  }

  cancelar() {
    this._router.navigate(['/aplicacion', 'actor', 'listar', this.peliculaId]);
  }

  formularioEsValido(actor: ActorInterface) {
    if (actor) {
      this.actorCrear = actor;
      this.actorCrear.pelicula = this.peliculaId; // asigno id ya que el formulario reescribe actor
      this.crearDisable = false;
    } else {
      this.crearDisable = true;
    }
  }

  obtenerPeliculaId() {
    this._activatedRoute.paramMap
    .subscribe((parametros) => {
      this.peliculaId = parametros.get('idPelicula');
    });
  }
}
