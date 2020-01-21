import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Noticia} from '../../clases/noticia';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
  MENSAJES_VALIDACION_DESCRIPCION_NOTICIA,
  MENSAJES_VALIDACION_TITULO_NOTICIA,
  VALIDACION_DESCRIPCION_NOTICIA,
  VALIDACION_TITULO_NOTICIA
} from '../../constantes/validaciones-formulario/validacion-noticia';
import {generarMensajesError} from '../../funciones/generar-mensajes-error';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-noticia-formulario',
  templateUrl: './noticia-formulario.component.html',
  styleUrls: ['./noticia-formulario.component.scss']
})
export class NoticiaFormularioComponent implements OnInit {

  @Output() noticiaValida: EventEmitter<Noticia | boolean> = new EventEmitter();
  @Input() noticia: Noticia;
  mensajesError = {
    titulo: [],
    descripcion: []
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
    this.iniciarFormulario();
  }


  iniciarFormulario() {
    this._inicializarFormulario();
    this._verificarCamposFormulario();
    this._verificarFormulario();
  }
  reiniciarFormulario() {
    this.formularioNoticia = undefined;
    this.subscribers.forEach(s => s.unsubscribe());
    this.subscribers = [];
    this.iniciarFormulario();
  }

  private _inicializarFormulario() {
    this.formularioNoticia = this._formBuilder.group({
      titulo: [this.noticia ? this.noticia.titulo : '', VALIDACION_TITULO_NOTICIA],
      descripcion: [this.noticia ? this.noticia.descripcion : '', VALIDACION_DESCRIPCION_NOTICIA]
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('titulo', MENSAJES_VALIDACION_TITULO_NOTICIA);
    this.verificarCampoFormControl('descripcion', MENSAJES_VALIDACION_DESCRIPCION_NOTICIA);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioNoticia;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const noticiaValida = formularioFormGroup.valid;
          if (noticiaValida) {
            this.noticiaValida.emit(formulario);
          } else {
            this.noticiaValida.emit(false);
          }
        }
      );
    this.subscribers.push(subscriber);
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
