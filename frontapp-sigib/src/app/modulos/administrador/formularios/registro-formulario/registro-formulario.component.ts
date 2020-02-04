import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import { Registro } from 'src/app/clases/registro';

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
  mostrarFormularioRegistro = true;


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
      nombre: [this.registro ? this.registro.nombre : '', ],
      password: [this.registro ? this.registro.password : '', ],
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('nombre', );
    this.verificarCampoFormControl('password', );
    this.verificarCampoFormControl('perfil', );
  }

  verificarCampoFormControl(campo) {
    const campoFormControl = this.formularioRegistro.get(campo);
    const subscriber = campoFormControl
      .valueChanges
      .pipe(debounceTime(100))
      .subscribe(
        valor => {
return true
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
            this.registroValido.emit(true);
          }
        }
      ));
    this.subscribers.push(subscriber);
  }

}
