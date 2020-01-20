import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {generarMensajesError} from '../../../../funciones/generar-mensajes-error';
import {ConfiguracionesInterface} from '../../../../interfaces/interfaces/configuraciones.interface';
import {
  MENSAJES_NUMEROS_ENTEROS,
  MENSAJES_VALIDACION_RANGO, VALIDACION_NUMEROS_ENTEROS,
  VALIDACION_RANGO
} from '../../../../constantes/validaciones-formulario/validacion-configuracion';

@Component({
  selector: 'app-rangos-valor-formulario',
  templateUrl: './rangos-valor-formulario.component.html',
  styleUrls: ['./rangos-valor-formulario.component.scss']
})
export class RangosValorFormularioComponent implements OnInit {

  @Output() configuracionValido: EventEmitter<ConfiguracionesInterface | boolean> = new EventEmitter();
  @Input() configuracion: ConfiguracionesInterface;

  mensajesError = {
    dineroJugador: [],
    stockAcciones: [],
    rangoInicialPvpAccion: [],
    rangoFinPvpAccion: [],
    rangoInicialPvpRenta: [],
    rangoFinPvpRenta: [],
    rangoInicialNotiPos: [],
    rangoFinNotiPos: [],
    rangoInicialNotiNeg: [],
    rangoFinNotiNeg: [],
    tiempoPitido: [],

    rangoIniBoom: [],
    rangoFinBoom: [],
    rangoIniCrush: [],
    rangoFinCrush: [],
    rangoIniSplit: [],
    rangoFinSplit: [],
    rangoIniConSplit: [],
    rangoFinConSplit: []
  };

  formularioConfiguracion: FormGroup;
  subscribers = [];

  constructor(
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
    this.formularioConfiguracion = undefined;
    this.subscribers.forEach(s => s.unsubscribe());
    this.subscribers = [];
    this.iniciarFormulario();
  }

  private _inicializarFormulario() {
    this.formularioConfiguracion = this._formBuilder.group({
      dineroJugador: [this.configuracion ? +this.configuracion.dineroJugador : '', VALIDACION_NUMEROS_ENTEROS],
      stockAcciones: [this.configuracion ? +this.configuracion.stockAcciones : '', VALIDACION_NUMEROS_ENTEROS],
      rangoInicialPvpAccion: [this.configuracion ? +this.configuracion.rangoInicialPvpAccion : '', VALIDACION_NUMEROS_ENTEROS],
      rangoFinPvpAccion: [this.configuracion ? +this.configuracion.rangoFinPvpAccion : '', VALIDACION_NUMEROS_ENTEROS],
      rangoInicialPvpRenta: [this.configuracion ? +this.configuracion.rangoInicialPvpRenta : '', VALIDACION_NUMEROS_ENTEROS],
      rangoFinPvpRenta: [this.configuracion ? +this.configuracion.rangoFinPvpRenta : '', VALIDACION_NUMEROS_ENTEROS],
      rangoInicialNotiPos: [this.configuracion ? +this.configuracion.rangoInicialNotiPos : '', VALIDACION_NUMEROS_ENTEROS],
      rangoFinNotiPos: [this.configuracion ? +this.configuracion.rangoFinNotiPos : '', VALIDACION_NUMEROS_ENTEROS],
      rangoInicialNotiNeg: [this.configuracion ? +this.configuracion.rangoInicialNotiNeg : '', VALIDACION_NUMEROS_ENTEROS],
      rangoFinNotiNeg: [this.configuracion ? +this.configuracion.rangoFinNotiNeg : '', VALIDACION_NUMEROS_ENTEROS],
      tiempoPitido: [this.configuracion ? +this.configuracion.tiempoPitido : '', VALIDACION_NUMEROS_ENTEROS],

      rangoIniBoom: [this.configuracion ? +this.configuracion.rangoIniBoom : '', VALIDACION_NUMEROS_ENTEROS],
      rangoFinBoom: [this.configuracion ? +this.configuracion.rangoFinBoom : '', VALIDACION_NUMEROS_ENTEROS],
      rangoIniCrush: [this.configuracion ? +this.configuracion.rangoIniCrush : '', VALIDACION_NUMEROS_ENTEROS],
      rangoFinCrush: [this.configuracion ? +this.configuracion.rangoFinCrush : '', VALIDACION_NUMEROS_ENTEROS],
      rangoIniSplit: [this.configuracion ? +this.configuracion.rangoIniSplit : '', VALIDACION_NUMEROS_ENTEROS],
      rangoFinSplit: [this.configuracion ? +this.configuracion.rangoFinSplit : '', VALIDACION_NUMEROS_ENTEROS],
      rangoIniConSplit: [this.configuracion ? +this.configuracion.rangoIniConSplit : '', VALIDACION_NUMEROS_ENTEROS],
      rangoFinConSplit: [this.configuracion ? +this.configuracion.rangoFinConSplit : '', VALIDACION_NUMEROS_ENTEROS],
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('dineroJugador', MENSAJES_NUMEROS_ENTEROS);
    this.verificarCampoFormControl('stockAcciones', MENSAJES_NUMEROS_ENTEROS);
    this.verificarCampoFormControl('rangoInicialPvpAccion', MENSAJES_NUMEROS_ENTEROS);
    this.verificarCampoFormControl('rangoFinPvpAccion', MENSAJES_NUMEROS_ENTEROS);
    this.verificarCampoFormControl('rangoInicialPvpRenta', MENSAJES_NUMEROS_ENTEROS);
    this.verificarCampoFormControl('rangoFinPvpRenta', MENSAJES_NUMEROS_ENTEROS);

    this.verificarCampoFormControl('rangoInicialNotiPos', MENSAJES_NUMEROS_ENTEROS);
    this.verificarCampoFormControl('rangoFinNotiPos', MENSAJES_NUMEROS_ENTEROS);
    this.verificarCampoFormControl('rangoInicialNotiNeg', MENSAJES_NUMEROS_ENTEROS);
    this.verificarCampoFormControl('rangoFinNotiNeg', MENSAJES_NUMEROS_ENTEROS);

    this.verificarCampoFormControl('tiempoPitido', MENSAJES_NUMEROS_ENTEROS);

    this.verificarCampoFormControl('rangoIniBoom', MENSAJES_NUMEROS_ENTEROS);
    this.verificarCampoFormControl('rangoFinBoom', MENSAJES_NUMEROS_ENTEROS);
    this.verificarCampoFormControl('rangoIniCrush', MENSAJES_NUMEROS_ENTEROS);
    this.verificarCampoFormControl('rangoFinCrush', MENSAJES_NUMEROS_ENTEROS);
    this.verificarCampoFormControl('rangoIniSplit', MENSAJES_NUMEROS_ENTEROS);
    this.verificarCampoFormControl('rangoFinSplit', MENSAJES_NUMEROS_ENTEROS);
    this.verificarCampoFormControl('rangoIniConSplit', MENSAJES_NUMEROS_ENTEROS);
    this.verificarCampoFormControl('rangoFinConSplit', MENSAJES_NUMEROS_ENTEROS);
  }

  verificarCampoFormControl(campo, mensajeValidacion) {
    const campoFormControl = this.formularioConfiguracion.get(campo);
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

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioConfiguracion;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const configuracionValido = formularioFormGroup.valid;
          if (configuracionValido) {
            this.configuracionValido.emit(formulario);
            // this.reiniciarFormulario();
          } else {
            this.configuracionValido.emit(false);
          }
        }
      );
    this.subscribers.push(subscriber);
  }

}
