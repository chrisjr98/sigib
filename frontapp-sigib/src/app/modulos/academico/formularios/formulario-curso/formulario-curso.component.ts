import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CursoInterface } from 'src/app/interfaces/interfaces/curso.interface';
import { Curso } from 'src/app/clases/curso';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VALIDACION_TITULO_USUARIO, MENSAJES_VALIDACION_TITULO_USUARIO, MENSAJES_VALIDACION_DESCRIPCION_USUARIO } from 'src/app/constantes/validaciones-formulario/validacion-usuario';
import { debounceTime } from 'rxjs/operators';
import { generarMensajesError } from 'src/app/funciones/generar-mensajes-error';

@Component({
  selector: 'app-formulario-curso',
  templateUrl: './formulario-curso.component.html',
  styleUrls: ['./formulario-curso.component.scss']
})
export class FormularioCursoComponent implements OnInit {

  @Output() cursoValido: EventEmitter< CursoInterface| boolean> = new EventEmitter();
  @Input() curso: Curso;
  mensajesError = {
    grupo: [],
    materia:  [],
    periodoacad: [],
    horario: [],
    aula:   [],
    profesor: [],
    numalumnosmax: []
  };
  formulario: FormGroup;
  subscribers = [];
  mostrarFormularioCurso = false;
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
    this.formularioCurso = this._formBuilder.group({


      grupo: [this.curso ? this.curso.grupo : '', VALIDACION_TITULO_USUARIO],
      materia:  [this.curso ? this.curso.materia : '', VALIDACION_TITULO_USUARIO],
      periodoacad: [this.curso ? this.curso.periodoacad : '', VALIDACION_TITULO_USUARIO],
      horario: [this.curso ? this.curso.horario : '', VALIDACION_TITULO_USUARIO],
      aula:   [this.curso ? this.curso.aula : '', VALIDACION_TITULO_USUARIO],
      profesor: [this.curso ? this.curso.profesor : '', VALIDACION_TITULO_USUARIO],
      numalumnosmax: [this.curso ? this.curso.numalumnosmax : '', VALIDACION_TITULO_USUARIO]
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('nombre', MENSAJES_VALIDACION_TITULO_USUARIO);
    this.verificarCampoFormControl('cedula', MENSAJES_VALIDACION_DESCRIPCION_USUARIO);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioCurso;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const cursoValido = formularioFormGroup.valid;
          if (cursoValido) {
            formulario.nivelJuego = this.setearValorSelect(formulario.nivelJuego);
            formulario.tipo = this.setearValorSelect(formulario.tipo);
            this.cursoValido.emit(formulario);
          } else {
            this.cursoValido.emit(false);
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
    const campoFormControl = this.formularioCurso.get(campo);
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
