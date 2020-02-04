import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UsuarioInterface} from '../../../../interfaces/interfaces/usuario.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
  MENSAJES_VALIDACION_DESCRIPCION_NOTICIA, MENSAJES_VALIDACION_NIVEL_NOTICIA,
  MENSAJES_VALIDACION_TITULO_NOTICIA,
  VALIDACION_DESCRIPCION_NOTICIA, VALIDACION_NIVEL_NOTICIA, VALIDACION_TIPO_NOTICIA,
  VALIDACION_TITULO_NOTICIA
} from '../../../../constantes/validaciones-formulario/validacion-noticia';
import {debounceTime, map, mergeMap} from 'rxjs/operators';
import {generarMensajesError} from '../../../../funciones/generar-mensajes-error';
import { Usuario } from "../../../../clases/usuario";
import {pipe} from 'rxjs';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.scss']
})
export class FormularioNoticiaComponent implements OnInit {

  @Output() noticiaValida: EventEmitter< UsuarioInterface| boolean> = new EventEmitter();
  @Input() noticia: Usuario;
  mensajesError = {
    cedula: [],
    nombre: [],
  };
  formularioNoticia: FormGroup;
  subscribers = [];
  mostrarFormularioNoticia = false;
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
    this.formularioNoticia = this._formBuilder.group({
      cedula: [this.noticia ? this.noticia.cedula : '', VALIDACION_TITULO_NOTICIA],
      nombre: [this.noticia ? this.noticia.nombre : '', VALIDACION_DESCRIPCION_NOTICIA],
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('nombre', MENSAJES_VALIDACION_TITULO_NOTICIA);
    this.verificarCampoFormControl('cedula', MENSAJES_VALIDACION_DESCRIPCION_NOTICIA);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioNoticia;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const noticiaValidada = formularioFormGroup.valid;
          if (noticiaValidada) {
            formulario.nivelJuego = this.setearValorSelect(formulario.nivelJuego);
            formulario.tipo = this.setearValorSelect(formulario.tipo);
            this.noticiaValida.emit(formulario);
          } else {
            this.noticiaValida.emit(false);
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
    const campoFormControl = this.formularioNoticia.get(campo);
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
