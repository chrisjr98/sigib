import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
  MENSAJES_VALIDACION_DESCRIPCION_NOTICIA,
  MENSAJES_VALIDACION_TITULO_NOTICIA,
  VALIDACION_DESCRIPCION_NOTICIA,
  VALIDACION_TITULO_NOTICIA
} from '../../constantes/validaciones-formulario/validacion-noticia';
import {generarMensajesError} from '../../funciones/generar-mensajes-error';
import {debounceTime} from 'rxjs/operators';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-usuario-formulario',
  templateUrl: './usuario-formulario.component.html',
  styleUrls: ['./usuario-formulario.component.scss']
})
export class UsuarioFormularioComponent implements OnInit {

  @Output() usuarioValida: EventEmitter<Usuario | boolean> = new EventEmitter();
  @Input() usuario: Usuario;
  mensajesError = {
    titulo: [],
    descripcion: []
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
    this.iniciarFormulario();
  }


  iniciarFormulario() {
    this._inicializarFormulario();
    this._verificarCamposFormulario();
    this._verificarFormulario();
  }
  reiniciarFormulario() {
    this.formularioUsuario = undefined;
    this.subscribers.forEach(s => s.unsubscribe());
    this.subscribers = [];
    this.iniciarFormulario();
  }

  private _inicializarFormulario() {
    this.formularioUsuario = this._formBuilder.group({
      cedula: [this.usuario ? this.usuario.cedula : '', VALIDACION_TITULO_NOTICIA],
      password: [this.usuario ? this.usuario.password : '', VALIDACION_DESCRIPCION_NOTICIA]
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('cedula', MENSAJES_VALIDACION_TITULO_NOTICIA);
    this.verificarCampoFormControl('password', MENSAJES_VALIDACION_DESCRIPCION_NOTICIA);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioUsuario;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const noticiaValida = formularioFormGroup.valid;
          if (noticiaValida) {
            this.usuarioValida.emit(formulario);
          } else {
            this.usuarioValida.emit(false);
          }
        }
      );
    this.subscribers.push(subscriber);
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
