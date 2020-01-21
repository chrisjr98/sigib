import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RentaFijaInterface} from '../../../../interfaces/interfaces/renta-fija.interface';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
  MENSAJES_VALIDACION_TIPO_VALOR,
  VALIDACION_TIPO_VALOR
} from '../../../../constantes/validaciones-formulario/validacion-renta-fija';
import {debounceTime} from 'rxjs/operators';
import {generarMensajesError} from '../../../../funciones/generar-mensajes-error';


@Component({
  selector: 'app-renta-fija-formulario',
  templateUrl: './renta-fija-formulario.component.html',
  styleUrls: ['./renta-fija-formulario.component.scss']
})
export class RentaFijaFormularioComponent implements OnInit {

  @Output() rentaFijaValida: EventEmitter<RentaFijaInterface | boolean> = new EventEmitter();
  @Input() rentaFija: RentaFijaInterface;
  mensajesError = {
    tipoValor: [],
    tiempo: [],
  };
  formularioRentaFija: FormGroup;
  subscribers = [];

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

  private _inicializarFormulario() {
    this.formularioRentaFija = this._formBuilder.group({
      tipoValor: [this.rentaFija ? this.rentaFija.tipoValor : '', VALIDACION_TIPO_VALOR],
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('tipoValor', MENSAJES_VALIDACION_TIPO_VALOR);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioRentaFija;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const papelRentaFijaValida = formularioFormGroup.valid;
          if (papelRentaFijaValida) {
            this.rentaFijaValida.emit(formulario);
          } else {
            this.rentaFijaValida.emit(false);
          }
        }
      );
    this.subscribers.push(subscriber);
  }

  verificarCampoFormControl(campo, mensajeValidacion) {
    const campoFormControl = this.formularioRentaFija.get(campo);
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
