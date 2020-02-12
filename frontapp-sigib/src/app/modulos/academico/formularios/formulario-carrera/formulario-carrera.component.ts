import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Carrera } from 'src/app/clases/carrera';
import { CarreraInterface } from 'src/app/interfaces/interfaces/carrera.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-formulario-carrera',
  templateUrl: './formulario-carrera.component.html',
  styleUrls: ['./formulario-carrera.component.scss']
})
export class FormularioCarreraComponent implements OnInit {

 @Output() carreraValida: EventEmitter< CarreraInterface| boolean> = new EventEmitter();
  @Input() carrera: Carrera;
  mensajesError = {
    codigo: [],
    nombre: [],
  };
  formularioCarrera: FormGroup;
  subscribers = [];
  mostrarFormularioCarrera = false;
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
    this.formularioCarrera = this._formBuilder.group({
      codigo: [this.carrera ? this.carrera.codigo : ''],
      nombre: [this.carrera ? this.carrera.nombre : ''],
      duracion: [this.carrera ? this.carrera.duracion : ''],
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('nombre');
    this.verificarCampoFormControl('cedula');
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioCarrera;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const UsuarioValidada = formularioFormGroup.valid;
          if (UsuarioValidada) {
            formulario.nivelJuego = this.setearValorSelect(formulario.nivelJuego);
            formulario.tipo = this.setearValorSelect(formulario.tipo);
            this.carreraValida.emit(formulario);
          } else {
            this.carreraValida.emit(false);
          }
        }
      );
    this.subscribers.push(subscriber);
  }

  setearValorSelect(campo) {
    const esString = typeof campo === 'string';
    return esString ? JSON.parse(campo) : campo;
  }
  verificarCampoFormControl(campo) {
    const campoFormControl = this.formularioCarrera.get(campo);
    const subscriber = campoFormControl
      .valueChanges
      .pipe(debounceTime(500))
      .subscribe(
        valor => {
        return true;
        }
      );
    this.subscribers.push(subscriber);
  }
}
