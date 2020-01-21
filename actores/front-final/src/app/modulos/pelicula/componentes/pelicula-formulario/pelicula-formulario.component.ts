import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { PeliculaInterface } from '../../interfaces/pelicula.interface';
import {
  validacionLetras, validacionNumero, setearMensajes,
  mensajesValidacionLetras, mensajesValidacionNumero, mensajesValidacionAnio, validacionAnio
} from 'src/app/shared/validaciones';
import { debounceTime } from 'rxjs/operators';
import { ProductoraService } from 'src/app/servicios/productora.service';
import { ProductoraInterface } from 'src/app/modulos/productora/interfaces/productora.interface';

@Component({
  selector: 'app-pelicula-formulario',
  templateUrl: './pelicula-formulario.component.html',
  styleUrls: ['./pelicula-formulario.component.css']
})
export class PeliculaFormularioComponent implements OnInit {

  productoras: ProductoraInterface[];

  formulario: FormGroup;

  mensajesErrorNombre: string[] = [];
  mensajesErrorAnio: string[] = [];
  mensajesErrorGenero: string[] = [];
  mensajesErrorTaquilla: string[] = [];
  mensajesErrorPremios: string[] = [];
  mensajesErrorRating: string[] = [];
  mensajesErrorProductora: string[] = [];

  @Input() pelicula: PeliculaInterface;

  @Output() formularioValido: EventEmitter<PeliculaInterface | boolean> = new EventEmitter();

  @Input() soloVerFormulario = false;

  @Input() puedeEditarFormulario = false;

  @Input() productoraFija = false;



  constructor(private readonly _formBuilder: FormBuilder,
    private readonly _productoraService: ProductoraService) { }

  ngOnInit() {

    this.inicializarFormulario();

    this.enviarFormularioValido();

    if (this.pelicula) {
      this.llenarFormulario();
    }
  }

  llenarFormulario() {
    this.formulario.patchValue({
      nombre: this.pelicula.nombre,
      anioProduccion: this.pelicula.anioProduccion,
      genero: this.pelicula.genero,
      rating: this.pelicula.rating,
      premios: this.pelicula.premios,
      taquilla: this.pelicula.taquilla,
      productora: this.pelicula.productora.nombre
    });
  }

  inicializarFormulario() {

    this.formulario = this._formBuilder.group({
      nombre: [
        { value: '', disabled: false },
        validacionLetras,
      ],
      anioProduccion: [
        '',
        validacionAnio
      ],
      genero: [
        '',
        validacionLetras
      ],
      rating: [
        '',
        validacionNumero
      ],
      premios: [
        '',
        validacionNumero
      ],
      taquilla: [
        '',
        validacionNumero
      ],
      productora: [
        'Seleccionar Una',
        validacionLetras
      ],
    });

    if (this.soloVerFormulario) {
      this.formulario.disable();
    }

    if (this.puedeEditarFormulario) {
      this.formulario.disable();
      this.formulario.get('rating').enable();
      this.formulario.get('premios').enable();
      this.formulario.get('taquilla').enable();
    }
    this.formulario.valueChanges
      .pipe(debounceTime(100))
      .subscribe(() => {
        this.mensajesErrorNombre = setearMensajes(this.formulario.get('nombre'), mensajesValidacionLetras);
        this.mensajesErrorAnio = setearMensajes(this.formulario.get('anioProduccion'), mensajesValidacionAnio);
        this.mensajesErrorGenero = setearMensajes(this.formulario.get('genero'), mensajesValidacionLetras);
        this.mensajesErrorTaquilla = setearMensajes(this.formulario.get('taquilla'), mensajesValidacionNumero);
        this.mensajesErrorPremios = setearMensajes(this.formulario.get('premios'), mensajesValidacionNumero);
        this.mensajesErrorRating = setearMensajes(this.formulario.get('rating'), mensajesValidacionNumero);
      });

    this.obtenerProductoras();
  }

  enviarFormularioValido() {
    this.formulario.valueChanges
      .subscribe(() => {
        if (this.formulario.valid) {
          this.formularioValido.emit(this.formulario.value);
        } else {
          this.formularioValido.emit(false);
        }

      });
  }

  obtenerProductoras() {
    this._productoraService.obtenerTodos(0, 0)
      .subscribe((productoras: any) => {
        console.log(productoras);
        this.productoras = productoras.data.encontrarTodasProductoras;
      },
        (error) => {
          console.log('error productoras', error);
        });
  }
}
