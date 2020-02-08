import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RolInterface } from 'src/app/interfaces/interfaces/role.interfaces';
import { Rol } from 'src/app/clases/role';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VALIDACION_TITULO_USUARIO, VALIDACION_DESCRIPCION_USUARIO, MENSAJES_VALIDACION_TITULO_USUARIO, MENSAJES_VALIDACION_DESCRIPCION_USUARIO } from 'src/app/constantes/validaciones-formulario/validacion-usuario';
import { debounceTime } from 'rxjs/operators';
import { generarMensajesError } from 'src/app/funciones/generar-mensajes-error';
import { ProductoInterface } from 'src/app/interfaces/interfaces/producto.interface';
import { Producto } from 'src/app/clases/producto';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.scss']
})
export class FormularioProductoComponent implements OnInit {

  @Output() productoValido: EventEmitter<ProductoInterface | boolean> = new EventEmitter();
  @Input() producto: Producto;
  mensajesError = {
    codigo: [],
    nombre: [],
  };
  formularioRol: FormGroup;
  subscribers = [];
  mostrarFormularioRol = false;
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
  nombre: string;
  identificador: string;
  tipo: string;
  marca: string;
  descontinuado: boolean;
  precioUnitario: number;
  stock?: number;
  private _inicializarFormulario() {
    this.formularioRol = this._formBuilder.group({
      nombre: [this.producto ? this.producto.nombre : '', VALIDACION_TITULO_USUARIO],
      identificador: [this.producto ? this.producto.identificador : '', VALIDACION_DESCRIPCION_USUARIO],
      tipo: [this.producto ? this.producto.tipo : '', VALIDACION_TITULO_USUARIO],
      marca: [this.producto ? this.producto.marca : '', VALIDACION_DESCRIPCION_USUARIO],
      descontinuado: [this.producto ? this.producto.descontinuado : '', VALIDACION_TITULO_USUARIO],
      stock: [this.producto ? this.producto.stock : '', VALIDACION_DESCRIPCION_USUARIO],
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('nombre', MENSAJES_VALIDACION_TITULO_USUARIO);
    this.verificarCampoFormControl('cedula', MENSAJES_VALIDACION_DESCRIPCION_USUARIO);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioRol;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const UsuarioValidada = formularioFormGroup.valid;
          if (UsuarioValidada) {
            formulario.nivelJuego = this.setearValorSelect(formulario.nivelJuego);
            formulario.tipo = this.setearValorSelect(formulario.tipo);
            this.productoValido.emit(formulario);
          } else {
            this.productoValido.emit(false);
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
    const campoFormControl = this.formularioRol.get(campo);
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
