import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProductoraInterface } from '../../interfaces/productora.interface';
import { validacionLetras, validacionNumero, setearMensajes,
  mensajesValidacionLetras, validacionFechaSimple, mensajesValidacionFechaSimple,
  validacionObligatoria } from 'src/app/shared/validaciones';
import { debounceTime } from 'rxjs/operators';
import { obtenerPaises } from 'src/app/shared/opciones';

@Component({
  selector: 'app-productora-formulario',
  templateUrl: './productora-formulario.component.html',
  styleUrls: ['./productora-formulario.component.css']
})
export class ProductoraFormularioComponent implements OnInit {

  formulario: FormGroup;

  mensajesErrorNombre: string[] = [];
  mensajesErrorFundacion: string[] = [];
  mensajesErrorPropietario: string[] = [];
  mensajesErrorFundador: string[] = [];
  mensajesErrorPais: string[] = [];

  @Input() productora;

  @Output() formularioValido: EventEmitter<ProductoraInterface|boolean> = new EventEmitter();

  @Input() soloVerFormulario = false;

  @Input() puedeEditarFormulario = false;

  paises;

  paisSeleccionado;

  constructor(private readonly _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.paises = obtenerPaises();

    this.inicializarFormulario();

    this.enviarFormularioValido();

    if (this.productora) {
      this.llenarFormulario();
    }
  }

  llenarFormulario() {
    this.formulario.patchValue({
      nombre: this.productora.nombre,
      fechaFundacion: this.productora.fechaFundacion,
      propietario: this.productora.propietario,
      fundador: this.productora.fundador,
      pais: this.productora.pais
    });
  }

  inicializarFormulario() {
    this.formulario = this._formBuilder.group({
      nombre: [
        {value: '', disabled: false},
        validacionLetras,
      ],
      fechaFundacion: [
        '',
        validacionFechaSimple
      ],
      fundador: [
        '',
        validacionLetras
      ],
      pais: [
        '',
        validacionObligatoria
      ],
      propietario: [
        '',
        validacionLetras
      ]
    });

    if (this.soloVerFormulario) {
      this.formulario.disable();
    }

    if (this.puedeEditarFormulario) {
      this.formulario.disable();
      this.formulario.get('propietario').enable();
    }
    this.formulario.valueChanges
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.mensajesErrorNombre = setearMensajes(this.formulario.get('nombre'), mensajesValidacionLetras);
        this.mensajesErrorFundacion = setearMensajes(this.formulario.get('fechaFundacion'), mensajesValidacionFechaSimple);
        this.mensajesErrorPropietario = setearMensajes(this.formulario.get('propietario'), mensajesValidacionLetras);
        this.mensajesErrorFundador = setearMensajes(this.formulario.get('fundador'), mensajesValidacionLetras);
        this.mensajesErrorPais = setearMensajes(this.formulario.get('pais'), mensajesValidacionLetras);
      });
  }

  enviarFormularioValido() {
    this.formulario.valueChanges
      .subscribe((f) => {
        if (this.formulario.valid) {
          const usoCombo = !(this.soloVerFormulario || this.puedeEditarFormulario);
          if (usoCombo) {
            f.pais = f.pais.name;
          }
          this.formularioValido.emit(f);
        } else {
          this.formularioValido.emit(false);
        }

      });
  }


}
