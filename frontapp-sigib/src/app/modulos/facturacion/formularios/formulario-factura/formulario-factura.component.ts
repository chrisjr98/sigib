import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UsuarioInterface } from 'src/app/interfaces/interfaces/usuario.interface';
import { Usuario } from 'src/app/clases/usuario';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VALIDACION_TITULO_USUARIO, VALIDACION_DESCRIPCION_USUARIO, MENSAJES_VALIDACION_TITULO_USUARIO, MENSAJES_VALIDACION_DESCRIPCION_USUARIO } from 'src/app/constantes/validaciones-formulario/validacion-usuario';
import { debounceTime } from 'rxjs/operators';
import { generarMensajesError } from 'src/app/funciones/generar-mensajes-error';
import { Factura } from 'src/app/clases/factura';
import { FacturaInterface } from 'src/app/interfaces/interfaces/factura.interface';

@Component({
  selector: 'app-formulario-factura',
  templateUrl: './formulario-factura.component.html',
  styleUrls: ['./formulario-factura.component.scss']
})
export class FormularioFacturaComponent implements OnInit {


  @Output() facturaValida: EventEmitter< FacturaInterface| boolean> = new EventEmitter();
  @Input() factura: Factura;
  mensajesError = {
    numero:[],
    concepto: [],
    formapago: [],
    fecha: [],
    tcliente: [],
    estado: []
  };
  formularioFactura: FormGroup;
  subscribers = [];
  mostrarFormularioFactura = false;
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
    this.formularioFactura = this._formBuilder.group({
      numero:   [this.factura ? this.factura.numero : '', VALIDACION_TITULO_USUARIO],
      concepto: [this.factura ? this.factura.concepto : '', VALIDACION_TITULO_USUARIO],
      formapago: [this.factura ? this.factura.formapago : '', VALIDACION_TITULO_USUARIO],
      fecha:    [this.factura ? this.factura.fecha : '', VALIDACION_TITULO_USUARIO],
      tcliente: [this.factura ? this.factura.tcliente : '', VALIDACION_TITULO_USUARIO],
      estado: [this.factura ? this.factura.estado : '', VALIDACION_TITULO_USUARIO]
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('nombre', MENSAJES_VALIDACION_TITULO_USUARIO);
    this.verificarCampoFormControl('cedula', MENSAJES_VALIDACION_DESCRIPCION_USUARIO);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioFactura;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const UsuarioValidada = formularioFormGroup.valid;
          if (UsuarioValidada) {
            formulario.nivelJuego = this.setearValorSelect(formulario.nivelJuego);
            formulario.tipo = this.setearValorSelect(formulario.tipo);
            this.facturaValida.emit(formulario);
          } else {
            this.facturaValida.emit(false);
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
    const campoFormControl = this.formularioFactura.get(campo);
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
