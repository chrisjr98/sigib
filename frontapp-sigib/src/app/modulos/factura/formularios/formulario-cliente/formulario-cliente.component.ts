import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { UsuarioInterface } from 'src/app/interfaces/interfaces/usuario.interface';
import { Usuario } from 'src/app/clases/usuario';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VALIDACION_TITULO_USUARIO, VALIDACION_DESCRIPCION_USUARIO, MENSAJES_VALIDACION_TITULO_USUARIO, MENSAJES_VALIDACION_DESCRIPCION_USUARIO } from 'src/app/constantes/validaciones-formulario/validacion-usuario';
import { debounceTime } from 'rxjs/operators';
import { generarMensajesError } from 'src/app/funciones/generar-mensajes-error';
import { ClienteInterface } from 'src/app/interfaces/interfaces/cliente.interface';
import { Cliente } from 'src/app/clases/cliente';

@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.scss']
})
export class FormularioClienteComponent implements OnInit {

  @Output() clienteValido: EventEmitter< ClienteInterface| boolean> = new EventEmitter();
  @Input() cliente: Cliente;
  mensajesError = {
    nombre: [],
    apellido: [],
    cedula: [],
    direccion: [],
    telefono: [],
  };
  formularioCliente: FormGroup;
  subscribers = [];
  mostrarFormularioCliente = false;
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
    this.formularioCliente = this._formBuilder.group({
      nombre:     [this.cliente ? this.cliente.nombre : '', VALIDACION_TITULO_USUARIO],
      apellido:   [this.cliente ? this.cliente.apellido : '', VALIDACION_TITULO_USUARIO],
      cedula:     [this.cliente ? this.cliente.cedula : '', VALIDACION_TITULO_USUARIO],
      direccion:  [this.cliente ? this.cliente.direccion : '', VALIDACION_TITULO_USUARIO],
      telefono:   [this.cliente ? this.cliente.telefono : '', VALIDACION_TITULO_USUARIO],
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('nombre', MENSAJES_VALIDACION_TITULO_USUARIO);
    this.verificarCampoFormControl('cedula', MENSAJES_VALIDACION_DESCRIPCION_USUARIO);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioCliente;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const UsuarioValidada = formularioFormGroup.valid;
          if (UsuarioValidada) {
            formulario.nivelJuego = this.setearValorSelect(formulario.nivelJuego);
            formulario.tipo = this.setearValorSelect(formulario.tipo);
            this.clienteValido.emit(formulario);
          } else {
            this.clienteValido.emit(false);
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
    const campoFormControl = this.formularioCliente.get(campo);
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
