import { Component, OnInit, EventEmitter, Output, Input } from "@angular/core";
import { CursoInterface } from 'src/app/interfaces/interfaces/curso.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: "a pp-formulario-curso",
  templateUrl: "./formulario-curso.component.html",
  styleUrls: ["./formulario-curso.component.scss"]
})
export class FormularioCursoComponent implements OnInit {
  
  @Output() cursoValido: EventEmitter<
    CursoInterface | boolean
  > = new EventEmitter();
  @Input() curso: CursoInterface;

  mensajesError = {
    horario: [],
    aula: [],
    numeroMaximoAlumnos: [],
  };

  formularioCurso: FormGroup;
  subscribers = [];

  constructor(
    private readonly _formBuilder: FormBuilder,
    private readonly _toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this._inicializarFormulario();
    this._verificarCamposFormulario();
    this._verificarFormulario();
  }

  private _inicializarFormulario() {
    this.formularioCurso = this._formBuilder.group({
      nombre: [
        this.materiaCarrera ? this.materiaCarrera.nombre : "",
        VALIDACION_NOMBRE_MATERIA
      ],
      anio: [
        this.materiaCarrera ? this.materiaCarrera.anio : "",
        VALIDACION_ANIO_MATERIA
      ],
      tipo: [
        this.materiaCarrera ? this.materiaCarrera.tipoMateria : "",
        VALIDACION_TIPO_MATERIA
      ],
      carrera: [
        this.materiaCarrera ? this.materiaCarrera.carrera : this.carreraNombre
      ]
    });
    this.formularioMateria.get("carrera").disable();
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl("nombre", MENSAJE_NOMBRE_MATERIA);
    this.verificarCampoFormControl("anio", MENSAJE_ANIO_MATERIA);
    this.verificarCampoFormControl("tipo", MENSAJE_TIPO_MATERIA);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioMateria;
    const subscriber = formularioFormGroup.valueChanges.subscribe(
      formulario => {
        const materiaCarreraValida = formularioFormGroup.valid;
        if (materiaCarreraValida) {
          this.materiaCarreraValida.emit(formulario);
        } else {
          this.materiaCarreraValida.emit(false);
        }
      },
      e => {
        console.error(e);
      }
    );
    this.subscribers.push(subscriber);
  }

  verificarCampoFormControl(campo, mensajeValidacion) {
    const campoFormControl = this.formularioMateria.get(campo);
    const subscriber = campoFormControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(valor => {
        this.mensajesError[campo] = generarMensajesError(
          campoFormControl,
          this.mensajesError[campo],
          mensajeValidacion
        );
      });
    this.subscribers.push(subscriber);
  }
}
