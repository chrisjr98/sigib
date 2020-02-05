import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { debounceTime } from 'rxjs/operators';
import { generarMensajesError } from 'src/app/funciones/generar-mensajes-error';
import { Comprobante } from 'src/app/clases/comprobante';

@Component({
  selector: 'app-formulario-comprobante',
  templateUrl: './formulario-comprobante.component.html',
  styleUrls: ['./formulario-comprobante.component.scss']
})
export class FormularioComprobanteComponent implements OnInit {

  @Input() comprobante: Comprobante;
  @Output() comprobanteValido: EventEmitter<Comprobante | boolean> = new EventEmitter();
  mensajesError = {
    nombre: [],
    dificultad: [],
    password: [],
    numeroDeRondas: [],
    tiempoDeRonda: [],
    numeroDeAcciones: []
  };
  subscribers = [];
  formularioJuego: FormGroup;
  mostrarFormularioJuego = false;

  nivelDificultad: any[];
  dificultadSeleccionado;

  constructor(
    public dialogo: MatDialog,
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
    this.formularioJuego = undefined;
    this.subscribers.forEach(s => s.unsubscribe());
    this.subscribers = [];
    this.iniciarFormulario();
  }

  private _inicializarFormulario() {
    this.formularioJuego = this._formBuilder.group({
      beneficiario: [this.comprobante ? this.comprobante.beneficiario : ''],
      ci: [this.comprobante ? this.comprobante.ci : ''],
      comprobantePor: [this.comprobante ? this.comprobante.comprobantePor : ''],
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('beneficiario');
    this.verificarCampoFormControl('ci');
    this.verificarCampoFormControl('comprobantePor');
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioJuego;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const comprobanteValido = formularioFormGroup.valid;
          if (comprobanteValido) {
            this.comprobanteValido.emit(formulario);
          } else {
            this.comprobanteValido.emit(formulario);
          }
        }
      );
    this.subscribers.push(subscriber);
  }

  verificarCampoFormControl(campo) {
    const campoFormControl = this.formularioJuego.get(campo);
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
