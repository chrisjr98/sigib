import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime} from 'rxjs/operators';
import {generarMensajesError} from '../../../../funciones/generar-mensajes-error';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NivelJuegoInterface} from '../../../../interfaces/interfaces/nivel-juego.interface';
import {
  MENSAJES_VALIDACION_NOMBRE_NIVEL,
  VALIDACION_NOMBRE_NIVEL
} from '../../../../constantes/validaciones-formulario/validacion-nivel';

@Component({
  selector: 'app-nivel-formulario',
  templateUrl: './nivel-formulario.component.html',
  styleUrls: ['./nivel-formulario.component.scss']
})
export class NivelFormularioComponent implements OnInit {

  @Output() nivelValido: EventEmitter<NivelJuegoInterface | boolean> = new EventEmitter();
  @Input() nivel: NivelJuegoInterface;

  mensajesError = {
    nombre: [],
  };

  formularioNivel: FormGroup;
  subscribers = [];

  constructor(
    // tslint:disable-next-line: variable-name
    private readonly _formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this._inicializarFormulario();
    this._verificarCamposFormulario();
    this._verificarFormulario();
  }

  reiniciarFormulario() {
    this.formularioNivel = undefined;
    this.subscribers.forEach(s => s.unsubscribe());
    this.subscribers = [];
    this.iniciarFormulario();
  }

  private _inicializarFormulario() {
    this.formularioNivel = this._formBuilder.group({
      nombre: [this.nivel ? this.nivel.nombre : '', VALIDACION_NOMBRE_NIVEL],
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('nombre', MENSAJES_VALIDACION_NOMBRE_NIVEL);
  }

  verificarCampoFormControl(campo, mensajeValidacion) {
    const campoFormControl = this.formularioNivel.get(campo);
    const subscriber = campoFormControl
      .valueChanges
      .pipe(debounceTime(500))
      .subscribe(
        valor => {
          this.mensajesError[campo] = generarMensajesError(campoFormControl, this.mensajesError[campo], mensajeValidacion);
        }
      );
    this.subscribers.push(subscriber);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioNivel;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const nivelValido = formularioFormGroup.valid;
          if (nivelValido) {
            this.nivelValido.emit(formulario);
            // this.reiniciarFormulario();
          } else {
            this.nivelValido.emit(false);
          }
        }
      );
    this.subscribers.push(subscriber);
  }
}
