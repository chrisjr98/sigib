import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs/operators';
import {generarMensajesError} from '../../../../funciones/generar-mensajes-error';
import {RentaFijaEmisorInterface} from '../../../../interfaces/interfaces/renta-fija-emisor.interface';
import {
  MENSAJES_VALIDACION_NIVEL_JUEGO, MENSAJES_VALIDACION_RENTA_FIJA,
  MENSAJES_VALIDACION_TIEMPO, VALIDACION_NIVEL_JUEGO, VALIDACION_RENTA_FIJA,
  VALIDACION_TIEMPO
} from '../../../../constantes/validaciones-formulario/validacion-renta-fija-emisor';
import {NivelJuegoInterface} from '../../../../interfaces/interfaces/nivel-juego.interface';
import {NivelJuegoRestService} from '../../../../servicios/rest/servicios/nivel-juego-rest.service';
import {ToasterService} from 'angular2-toaster';
import {RentaFijaRestService} from '../../../../servicios/rest/servicios/renta-fija-rest.service';
import {RentaFijaInterface} from '../../../../interfaces/interfaces/renta-fija.interface';
import {error} from 'util';
import {
  MENSAJES_NUMEROS_ENTEROS,
  VALIDACION_NUMEROS_ENTEROS
} from '../../../../constantes/validaciones-formulario/validacion-configuracion';

@Component({
  selector: 'app-renta-fija-emisor-formulario',
  templateUrl: './renta-fija-emisor-formulario.component.html',
  styleUrls: ['./renta-fija-emisor-formulario.component.scss']
})
export class RentaFijaEmisorFormularioComponent implements OnInit {
  @Output() rentaFijaEmisorValida: EventEmitter<RentaFijaEmisorInterface | boolean> = new EventEmitter();
  @Input() rentaFijaEmisor: RentaFijaEmisorInterface;
  mensajesError = {
    tiempo: [],
    rendimiento: [],
    nivelJuego: [],
    rentaFija: []
  };
  formularioRentaFijaEmisor: FormGroup;
  subscribers = [];
  nivelesJuego = [];
  rentasFijas = [];

  constructor(
    // tslint:disable-next-line:variable-name
    private readonly _formBuilder: FormBuilder,
    // tslint:disable-next-line:variable-name
    private readonly _nivelJuegoRestService: NivelJuegoRestService,
    // tslint:disable-next-line:variable-name
    private readonly _toasterService: ToasterService,
    // tslint:disable-next-line:variable-name
    private readonly _rentaFijaRestService: RentaFijaRestService,
  ) {
    // this.cargarNiveles();
    this.cargarRentaFija();
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
    this.formularioRentaFijaEmisor = this._formBuilder.group({
      rendimiento: [this.rentaFijaEmisor ? this.rentaFijaEmisor.rendimiento : '', VALIDACION_NUMEROS_ENTEROS],
      tiempo: [this.rentaFijaEmisor ? this.rentaFijaEmisor.tiempo : '', VALIDACION_NUMEROS_ENTEROS],
      rentaFija: [this.rentaFijaEmisor ? this.rentaFijaEmisor.rentaFija : '', VALIDACION_RENTA_FIJA],
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('rendimiento', MENSAJES_NUMEROS_ENTEROS);
    this.verificarCampoFormControl('tiempo', MENSAJES_VALIDACION_TIEMPO);
    this.verificarCampoFormControl('rentaFija', MENSAJES_VALIDACION_RENTA_FIJA);
  }

  private _verificarFormulario() {
    const formularioFormGroup = this.formularioRentaFijaEmisor;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const rentaFijaEmisorValida = formularioFormGroup.valid;
          if (rentaFijaEmisorValida) {
            this.rentaFijaEmisorValida.emit(formulario);
          } else {
            this.rentaFijaEmisorValida.emit(false);
          }
        }, e => {
          console.error(e);
        }
      );
    this.subscribers.push(subscriber);
  }

  verificarCampoFormControl(campo, mensajeValidacion) {
    const campoFormControl = this.formularioRentaFijaEmisor.get(campo);
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

  private cargarRentaFija() {
    this._rentaFijaRestService.findAll()
      .subscribe(
        (respuesta: [RentaFijaInterface[], number]) => {
          this.rentasFijas = respuesta[0];
        }
        // tslint:disable-next-line:no-shadowed-variable
        , error => {
          console.error(error);
          this._toasterService.pop('error', 'Error', 'Error al cargar los tipos de renta fija');
        }
      );
  }
}
