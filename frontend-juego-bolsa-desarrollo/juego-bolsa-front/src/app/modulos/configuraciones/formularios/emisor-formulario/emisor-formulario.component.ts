import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
  MENSAJES_VALIDACION_DESCRIPCION,
  MENSAJES_VALIDACION_NOMBRE_EMISOR, MENSAJES_VALIDACION_OATH_LOGO_EMISOR,
  VALIDACION_DESCRIPCION,
  VALIDACION_NOMBRE_EMISOR, VALIDACION_PATH_LOGO
} from '../../../../constantes/validaciones-formulario/validacion-emisor';
import {EmisorInterface} from '../../../../interfaces/interfaces/emisor.interface';
import {debounceTime} from 'rxjs/operators';
import {generarMensajesError} from '../../../../funciones/generar-mensajes-error';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-emisor-formulario',
  templateUrl: './emisor-formulario.component.html',
  styleUrls: ['./emisor-formulario.component.scss']
})
export class EmisorFormularioComponent implements OnInit {

  @Output() emisorValidoEnviar: EventEmitter<EmisorInterface | boolean> = new EventEmitter();
  @Input() emisor: EmisorInterface ;
  imagenSeleccionada: File;
  mensajesError = {
    nombre: [],
    descripcion: []
  };

  formularioEmisor: FormGroup;
  subscribers = [];
  urlLogoEmisor: string;
  constructor(
    // tslint:disable-next-line: variable-name
    private readonly _formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.urlLogoEmisor = this.emisor ? this.setearPathLogo() : undefined;
    this.iniciarFormulario();
  }

  iniciarFormulario() {
    this._inicializarFormulario();
    this._verificarCamposFormulario();
    this._verificarFormulario();
  }

  reiniciarFormulario() {
    this.formularioEmisor = undefined;
    this.subscribers.forEach(s => s.unsubscribe());
    this.subscribers = [];
    this.iniciarFormulario();
  }

  private _inicializarFormulario() {
    this.formularioEmisor = this._formBuilder.group({
      nombre: [this.emisor ? this.emisor.nombre : '', VALIDACION_NOMBRE_EMISOR],
      descripcion: [this.emisor ? this.emisor.descripcion : '', VALIDACION_DESCRIPCION],
      archivoLogo: [this.emisor ? this.emisor.pathLogo : '', VALIDACION_PATH_LOGO]
    });
  }

  private _verificarCamposFormulario() {
    this.verificarCampoFormControl('nombre', MENSAJES_VALIDACION_NOMBRE_EMISOR);
    this.verificarCampoFormControl('descripcion', MENSAJES_VALIDACION_DESCRIPCION);
    this.verificarCampoFormControl('archivoLogo', MENSAJES_VALIDACION_OATH_LOGO_EMISOR);
  }

  verificarCampoFormControl(campo, mensajeValidacion) {
    const campoFormControl = this.formularioEmisor.get(campo);
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
    const formularioFormGroup = this.formularioEmisor;
    const subscriber = formularioFormGroup
      .valueChanges
      .subscribe(
        formulario => {
          const emisorValido = formularioFormGroup.valid;
          if (emisorValido) {
            this.emisorValidoEnviar.emit(formulario);
          } else {
            this.emisorValidoEnviar.emit(false);
          }
        }
      );
    this.subscribers.push(subscriber);
  }

  seleccionoArchivo(evento) {
    const fileList: FileList = evento.target.files;
    if (evento.target.files && evento.target.files[0]) {
      this.imagenSeleccionada = fileList[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.urlLogoEmisor = event.target.result;
      };
      reader.readAsDataURL(evento.target.files[0]);
    } else {
      this.urlLogoEmisor = null;
      this.imagenSeleccionada = null;
    }
    this.formularioEmisor.get('archivoLogo').patchValue(this.imagenSeleccionada);
  }

  private setearPathLogo() {
    return environment.url + ':' + environment.port + '/' + environment.pathLogosEmisores + '/' + this.emisor.pathLogo;
  }
}
