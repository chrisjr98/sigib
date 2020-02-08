import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UsuarioInterface } from 'src/app/interfaces/interfaces/usuario.interface';
import { Usuario } from 'src/app/clases/usuario';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { generarMensajesError } from 'src/app/funciones/generar-mensajes-error';
import { Comprobante } from 'src/app/clases/comprobante';
import { ComprobanteInterface } from 'src/app/interfaces/interfaces/comprobante.interface';

@Component({
  selector: 'app-formulario-comprobante',
  templateUrl: './formulario-comprobante.component.html',
  styleUrls: ['./formulario-comprobante.component.scss']
})
export class FormularioComprobanteComponent implements OnInit {


  @Output() comprobanteValido: EventEmitter< ComprobanteInterface| boolean> = new EventEmitter();
  @Input() comprobante: Comprobante;
  mensajesError = {
    numero:[],
    tipo: [],
    formapago: [],
    fecha: [],
    cantidad: []
  };
  formularioComprobante: FormGroup;
  subscribers = [];
  mostrarFormularioComprobante = false;
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
    this.formularioComprobante = this._formBuilder.group({
      numero:   [this.comprobante ? this.comprobante.numero : ''],
      tipo:     [this.comprobante ? this.comprobante.tipo : ''],
      formapago: [this.comprobante ? this.comprobante.formapago : ''],
      fecha:    [this.comprobante ? this.comprobante.fecha : ''],
      cantidad: [this.comprobante ? this.comprobante.cantidad : '']
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('nombre');
    this.verificarCampoFormControl('cedula');
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioComprobante;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const UsuarioValidada = formularioFormGroup.valid;
          if (UsuarioValidada) {
            formulario.nivelJuego = this.setearValorSelect(formulario.nivelJuego);
            formulario.tipo = this.setearValorSelect(formulario.tipo);
            this.comprobanteValido.emit(formulario);
          } else {
            this.comprobanteValido.emit(false);
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
    const campoFormControl = this.formularioComprobante.get(campo);
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
