import { Component, OnInit } from '@angular/core';
import { ActorInterface } from '../../interface/actor.interace';
import { ActorService } from 'src/app/servicios/actor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { FormBuilder } from '@angular/forms';
import { toastEditar, toastErrorEditar } from 'src/app/shared/toaster';

@Component({
  selector: 'app-actor-editar',
  templateUrl: './actor-editar.component.html',
  styleUrls: ['./actor-editar.component.css']
})
export class ActorEditarComponent implements OnInit {
  actorEditar: ActorInterface;

  botonEditarDisable = true;

  actor: ActorInterface;

  peliculaId: string;

  constructor(private readonly _actorService: ActorService,
              private readonly _router: Router,
              private readonly _activatedRoute: ActivatedRoute,
              private readonly _toastService: ToasterService,
              private readonly _formBuilder: FormBuilder) { }

  ngOnInit() {
    this._activatedRoute.paramMap.subscribe((parametrosRuta) => {
      const idActor = parametrosRuta.get('id');
      this.peliculaId = parametrosRuta.get('idPelicula');
      this._actorService.obtenerUno(+idActor).subscribe((peliculaResultado: any) => {
        this.actor = peliculaResultado;
      }, (error) => {
        console.error('error obteniendo la actor', error);
      });
    });
  }

  editar() {
    this._actorService.actualizar(+this.actor.id, this.actorEditar)
      .subscribe((resultado) => {
        console.log(this.actor.id);
        console.log('se creo exitosamente', resultado);
        this._toastService.pop(toastEditar);
        this._router.navigate(['/aplicacion', 'actor', 'listar', this.peliculaId, {resaltado: this.actor.id}]);
      }, (error) => {
        console.log('error creando :(', error);
        this._toastService.pop(toastErrorEditar);
      });
  }

  cancelar() {
    this._router.navigate(['/aplicacion', 'actor', 'listar', this.peliculaId, {resaltado: this.actor.id}]);
  }

  formularioEsValido(actor: ActorInterface) {

    const seEdito = ((actor.nominaciones !== this.actor.nominaciones) ||
                    (actor.premios !== this.actor.premios))
                    && actor;
    if (seEdito) {
      this.botonEditarDisable = false;
      this.actorEditar = actor;
    } else {
      this.botonEditarDisable = true;
    }
  }

}
