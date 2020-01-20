import {Validators} from '@angular/forms';
import { SOLO_ENTEROS_O_DECIMALES__POSITIVOS } from '../patrones';

export const VALIDACION_NOMBRE_JUEGO = [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(40),
];

export const MENSAJES_VALIDACION_NOMBRE_JUEGO = {
  required: 'El campo nombre es obligatorio',
  minlength: 'El campo nombre debe tener mínimo 3 caracteres',
  maxlength: 'El campo nombre no debe tener más de 40 caracteres'
};

export const VALIDACION_DIFICULTAD = [
  Validators.required,
];

export const MENSAJES_VALIDACION_DIFICULTAD = {
  required: 'El campo dificultad es obligatorio',
};

export const VALIDACION_PASSWORD = [
  Validators.required,
];
export const MENSAJES_VALIDACION_PASSWORD = {
  required: 'El campo password es obligatorio',
};

export const VALIDACION_NUMERO_RONDAS = [
  Validators.required,
  Validators.pattern(SOLO_ENTEROS_O_DECIMALES__POSITIVOS),
];
export const MENSAJES_NUMERO_RONDAS = {
  required: 'El campo número de rondas es obligatorio',
  pattern: 'El campo número de rondas debe tener solo números'
};

export const VALIDACION_TIEMPO_RONDA = [
  Validators.required,
  Validators.pattern(SOLO_ENTEROS_O_DECIMALES__POSITIVOS),
];
export const MENSAJES_TIEMPO_RONDA = {
  required: 'El campo tiempo de ronda es obligatorio',
  pattern: 'El campo tiempo de ronda debe tener solo números'
};

export const VALIDACION_NUMERO_ACCIONES = [
  Validators.required,
  Validators.pattern(SOLO_ENTEROS_O_DECIMALES__POSITIVOS),
];

export const MENSAJES_NUMERO_ACCIONES = {
  required: 'El campo número de acciones es obligatorio',
  pattern: 'El campo número de acciones debe tener solo números'
};

export function mensajeCampoRequerido(campo: string) {
  return {
    required:
      'El campo' +
      campo +
      ' es obligatorio',
  };
}




