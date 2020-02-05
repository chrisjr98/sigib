import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UsuarioInterface} from '../../../../interfaces/interfaces/usuario.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
  MENSAJES_VALIDACION_DESCRIPCION_USUARIO, MENSAJES_VALIDACION_NIVEL_USUARIO,
  MENSAJES_VALIDACION_TITULO_USUARIO,
  VALIDACION_DESCRIPCION_USUARIO, VALIDACION_NIVEL_USUARIO, VALIDACION_TIPO_USUARIO,
  VALIDACION_TITULO_USUARIO
} from '../../../../constantes/validaciones-formulario/validacion-usuario';
import {debounceTime, map, mergeMap} from 'rxjs/operators';
import {generarMensajesError} from '../../../../funciones/generar-mensajes-error';
import { Usuario } from "../../../../clases/usuario";
import {pipe} from 'rxjs';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss']
})
export class FormularioUsuarioComponent implements OnInit {

  @Output() usuarioValida: EventEmitter< UsuarioInterface| boolean> = new EventEmitter();
  @Input() usuario: Usuario;
  mensajesError = {
    cedula: [],
    nombre: [],
  };
  formularioUsuario: FormGroup;
  subscribers = [];
  mostrarFormularioUsuario = false;
  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _formBuilder: FormBuilder,
  ) {
  }

  ngOnInit() {
  }

  iniciarFormulario() {
    this._inicializarFormulario();
    this._verificarCamposFormulario();
    this._verificarFormulario();
  }

  private _inicializarFormulario() {
    this.formularioUsuario = this._formBuilder.group({
      cedula: [this.usuario ? this.usuario.cedula : '', VALIDACION_TITULO_USUARIO],
      nombre: [this.usuario ? this.usuario.nombre : '', VALIDACION_DESCRIPCION_USUARIO],
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('nombre', MENSAJES_VALIDACION_TITULO_USUARIO);
    this.verificarCampoFormControl('cedula', MENSAJES_VALIDACION_DESCRIPCION_USUARIO);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioUsuario;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const UsuarioValidada = formularioFormGroup.valid;
          if (UsuarioValidada) {
            formulario.nivelJuego = this.setearValorSelect(formulario.nivelJuego);
            formulario.tipo = this.setearValorSelect(formulario.tipo);
            this.usuarioValida.emit(formulario);
          } else {
            this.usuarioValida.emit(false);
          }
        }
      );
    this.subscribers.push(subscriber);
  }

  setearValorSelect(campo) {
    const esString = typeof campo === 'string';
    return esString ? JSON.parse(campo) : campo;
  }
  verificarCampoFormControl(campo, mensajeValidacion) {
    const campoFormControl = this.formularioUsuario.get(campo);
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
}
