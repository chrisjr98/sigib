import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Juego} from '../../clases/juego';
import {
  mensajeCampoRequerido, MENSAJES_NUMERO_ACCIONES,
  MENSAJES_NUMERO_RONDAS, MENSAJES_TIEMPO_RONDA,
  MENSAJES_VALIDACION_DIFICULTAD,
  MENSAJES_VALIDACION_NOMBRE_JUEGO,
  MENSAJES_VALIDACION_PASSWORD,
  VALIDACION_DIFICULTAD,
  VALIDACION_NOMBRE_JUEGO,
  VALIDACION_NUMERO_ACCIONES,
  VALIDACION_NUMERO_RONDAS,
  VALIDACION_PASSWORD,
  VALIDACION_TIEMPO_RONDA
} from '../../constantes/validaciones-formulario/validacion-juego';
import {debounceTime} from 'rxjs/operators';
import {generarMensajesError} from '../../funciones/generar-mensajes-error';
import {NivelJuegoRestService} from '../../servicios/rest/servicios/nivel-juego-rest.service';
import {JuegoRestService} from '../../servicios/rest/servicios/juego-rest.service';
import {MatDialog} from '@angular/material';
import {SeleccionarEmisoresComponent} from '../../modales/seleccionar-emisores/seleccionar-emisores/seleccionar-emisores.component';

@Component({
  selector: 'app-juego-formulario',
  templateUrl: './juego-formulario.component.html',
  styleUrls: ['./juego-formulario.component.scss']
})
export class JuegoFormularioComponent implements OnInit {

  arregloEmisores = [];
  @Output() emisoresSeleccionados: EventEmitter<any[]> = new EventEmitter();
  @Output() juegoValido: EventEmitter<Juego | boolean> = new EventEmitter();
  @Input() juego: Juego;
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
    // tslint:disable-next-line:variable-name
    private readonly _nivelJuegoRestService: NivelJuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _juegoRestService: JuegoRestService,
  ) {
  }

  ngOnInit() {
    this.cargarDificultades();
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
      nombre: [this.juego ? this.juego.nombre : '', VALIDACION_NOMBRE_JUEGO],
      dificultad: [this.juego ? this.juego.dificultad : '', VALIDACION_DIFICULTAD],
      password: [this.juego ? this.juego.password : '', VALIDACION_PASSWORD],
      numeroDeRondas: [this.juego ? this.juego.numeroDeRondas : '', VALIDACION_NUMERO_RONDAS],
      tiempoDeRonda: [this.juego ? this.juego.tiempoDeRonda : '', VALIDACION_TIEMPO_RONDA],
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('nombre', MENSAJES_VALIDACION_NOMBRE_JUEGO);
    this.verificarCampoFormControl('dificultad', MENSAJES_VALIDACION_DIFICULTAD);
    this.verificarCampoFormControl('password', MENSAJES_VALIDACION_PASSWORD);
    this.verificarCampoFormControl('numeroDeRondas', MENSAJES_NUMERO_RONDAS);
    this.verificarCampoFormControl('tiempoDeRonda', MENSAJES_TIEMPO_RONDA);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioJuego;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const juegoValido = formularioFormGroup.valid;
          if (juegoValido) {
            this.juegoValido.emit(formulario);
          } else {
            this.juegoValido.emit(false);
          }
        }
      );
    this.subscribers.push(subscriber);
  }

  verificarCampoFormControl(campo, mensajeValidacion) {
    const campoFormControl = this.formularioJuego.get(campo);
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

  async cargarDificultades() {
    await this._nivelJuegoRestService.findAll().subscribe(nivel => {
      this.nivelDificultad = nivel[0];
    });
  }
}
