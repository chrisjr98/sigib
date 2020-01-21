import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PeliculaInterface } from 'src/app/modulos/pelicula/interfaces/pelicula.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActorInterface } from '../../interface/actor.interace';
import { validacionLetras, validacionObligatoria, validacionNumero,
  setearMensajes, mensajesValidacionLetras, mensajesValidacionNumero, mensajesValidacionObligatorio } from 'src/app/shared/validaciones';
import { debounceTime } from 'rxjs/operators';
import { PeliculaService } from 'src/app/servicios/pelicula.service';

@Component({
  selector: 'app-formulario-actor',
  templateUrl: './formulario-actor.component.html',
  styleUrls: ['./formulario-actor.component.css']
})
export class FormularioActorComponent implements OnInit {

  peliculas: PeliculaInterface[];

  formulario: FormGroup;

  mensajesErrorNombre: string[] = [];
  mensajesErrorSexo: string[] = [];
  mensajesErrorPais: string[] = [];
  mensajesErrorNominaciones: string[] = [];
  mensajesErrorPremios: string[] = [];
  mensajesErrorPelicula: string[] = [];

  @Input() actor: ActorInterface;

  @Output() formularioValido: EventEmitter<ActorInterface | boolean> = new EventEmitter();

  @Input() soloVerFormulario = false;

  @Input() puedeEditarFormulario = false;

  constructor(private readonly _formBuilder: FormBuilder) { }

  ngOnInit() {

    this.inicializarFormulario();

    this.enviarFormularioValido();

    if (this.actor) {
      this.llenarFormulario();
    }
  }

  llenarFormulario() {
    this.formulario.patchValue({
      nombre: this.actor.nombre,
      sexo: this.actor.sexo,
      pais: this.actor.pais,
      nominaciones: this.actor.nominaciones,
      premios: this.actor.premios,
      pelicula: this.actor.pelicula.nombre
    });
  }

  inicializarFormulario() {

    this.formulario = this._formBuilder.group({
      nombre: [
        { value: '', disabled: false },
        validacionLetras,
      ],
      sexo: [
        'Seleccionar Una',
        validacionObligatoria
      ],
      pais: [
        '',
        validacionLetras
      ],
      nominaciones: [
        '',
        validacionNumero
      ],
      premios: [
        '',
        validacionNumero
      ],
    });

    if (this.soloVerFormulario) {
      this.formulario.disable();
    }

    if (this.puedeEditarFormulario) {
      this.formulario.disable();
      this.formulario.get('nominaciones').enable();
      this.formulario.get('premios').enable();
    }
    this.formulario.valueChanges
      .pipe(debounceTime(0))
      .subscribe(() => {
        this.mensajesErrorNombre = setearMensajes(this.formulario.get('nombre'), mensajesValidacionLetras);
        this.mensajesErrorSexo = setearMensajes(this.formulario.get('sexo'), mensajesValidacionObligatorio);
        this.mensajesErrorPais = setearMensajes(this.formulario.get('pais'), mensajesValidacionLetras);
        this.mensajesErrorNominaciones = setearMensajes(this.formulario.get('nominaciones'), mensajesValidacionNumero);
        this.mensajesErrorPremios = setearMensajes(this.formulario.get('premios'), mensajesValidacionNumero);
      });

  }

  enviarFormularioValido() {
    this.formulario.valueChanges
      .subscribe(() => {
        if (this.formulario.valid) {
          this.formularioValido.emit(this.formulario.value);
        } else {
          this.formularioValido.emit(false);
        }

      });
  }

}
