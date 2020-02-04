import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Registro} from '../../clases/registro';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
  MENSAJES_VALIDACION_NOMBRE_JUGADOR, MENSAJES_VALIDACION_PASSWORD_JUGARDOR,
  VALIDACION_NOMBRE_JUGADOR,
  VALIDACION_PASSWORD_JUGARDOR
} from '../../constantes/validaciones-formulario/validacion-registro';
import {generarMensajesError} from '../../funciones/generar-mensajes-error';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-registro-formulario',
  templateUrl: './registro-formulario.component.html',
  styleUrls: ['./registro-formulario.component.scss']
})
export class RegistroFormularioComponent implements OnInit {

  @Output() registroValido: EventEmitter<Registro | boolean> = new EventEmitter();
  @Input() registro: Registro;
  mensajesError = {
    nombre: [],
    password: [],
  };
  formularioRegistro: FormGroup;

  subscribers = [];
  mostrarFormularioRegistro = false;


  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _formBuilder: FormBuilder
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
    this.formularioRegistro = undefined;
    this.subscribers.forEach(s => s.unsubscribe());
    this.subscribers = [];
    this.iniciarFormulario();
  }

  private _inicializarFormulario() {
    this.formularioRegistro = this._formBuilder.group({
      nombre: [this.registro ? this.registro.nombre : '', VALIDACION_NOMBRE_JUGADOR],
      password: [this.registro ? this.registro.password : '', VALIDACION_PASSWORD_JUGARDOR],
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('nombre', MENSAJES_VALIDACION_NOMBRE_JUGADOR);
    this.verificarCampoFormControl('password', MENSAJES_VALIDACION_PASSWORD_JUGARDOR);
  }

  verificarCampoFormControl(campo, mensajeValidacion) {
    const campoFormControl = this.formularioRegistro.get(campo);
    const subscriber = campoFormControl
      .valueChanges
      .pipe(debounceTime(100))
      .subscribe(
        valor => {
          this.mensajesError[campo] = generarMensajesError(campoFormControl, this.mensajesError[campo], mensajeValidacion);
        }
      );
    this.subscribers.push(subscriber);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioRegistro;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe((
        formulario => {
          const registroValido = formularioFormGroup.valid;
          if (registroValido) {
            this.registroValido.emit(formulario);
          } else {
            this.registroValido.emit(false);
          }
        }
      ));
    this.subscribers.push(subscriber);
  }

}
