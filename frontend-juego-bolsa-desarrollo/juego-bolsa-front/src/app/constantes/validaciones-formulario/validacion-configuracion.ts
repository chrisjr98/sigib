import {Validators} from '@angular/forms';
import {SOLO_ENTEROS, SOLO_ENTEROS_O_DECIMALES__POSITIVOS} from '../patrones';

export const VALIDACION_RANGO = [
  Validators.required,
  Validators.pattern(SOLO_ENTEROS_O_DECIMALES__POSITIVOS),
];
export const MENSAJES_VALIDACION_RANGO = {
  required: 'El campo es obligatorio',
  pattern: 'El campo debe tener solo números'
};

export const VALIDACION_NUMEROS_ENTEROS = [
  Validators.required,
  Validators.pattern(SOLO_ENTEROS),
];

export const MENSAJES_NUMEROS_ENTEROS = {
  required: 'El campo es obligatorio',
  pattern: 'El campo debe tener solo números enteros'
};

export const VALIDACION_NIVEL_JUEGO = [
  Validators.required,
];

export const MENSAJES_VALIDACION_NIVEL_JUEGO = {
  required: 'El campo dificultad es obligatorio',
};

export function mensajeCampoRequerido(campo: string) {
  return {
    required:
      'El campo' +
      campo +
      ' es obligatorio',
  };
}




