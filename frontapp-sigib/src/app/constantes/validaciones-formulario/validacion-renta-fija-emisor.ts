import {Validators} from '@angular/forms';
import {SOLO_ENTEROS, SOLO_ENTEROS_O_DECIMALES__POSITIVOS} from '../patrones';

export const VALIDACION_ENTEROS = [
  Validators.required,
  Validators.pattern(SOLO_ENTEROS)
];

export const VALIDACION_PRECIO = [
  Validators.required,
  Validators.pattern(SOLO_ENTEROS_O_DECIMALES__POSITIVOS)
];

export const MENSAJES_VALIDACION_PRECIO = {
  required: 'El campo precio es obligatorio',
  pattern: 'El campo precio debe tener numeros enteros o decimales positivos'
};

export const VALIDACION_RENDIMIENTO = [
  Validators.required,
  Validators.pattern(SOLO_ENTEROS_O_DECIMALES__POSITIVOS)
];

export const MENSAJES_VALIDACION_RENDIMIENTO = {
  required: 'El campo precio actual es obligatorio',
  pattern: 'El campo precio actual debe tener numeros enteros o decimales positivos'
};

export const VALIDACION_TIEMPO = [
  Validators.required,
  Validators.pattern(SOLO_ENTEROS_O_DECIMALES__POSITIVOS)
];

export const MENSAJES_VALIDACION_TIEMPO = {
  required: 'El campo tiempo actual es obligatorio',
  pattern: 'El campo tiempo actual debe tener numeros enteros'
};

export const VALIDACION_NIVEL_JUEGO = [
  Validators.required,
];

export const MENSAJES_VALIDACION_NIVEL_JUEGO = {
  required: 'El campo nivel es obligatorio',
};

export const VALIDACION_RENTA_FIJA = [
  Validators.required,
];

export const MENSAJES_VALIDACION_RENTA_FIJA  = {
  required: 'El campo renta fija es obligatorio',
};

export const MENSAJES_VALIDACION_ENTEROS  = {
  required: 'El campo es obligatorio',
  pattern: 'El campo debe tener numeros enteros positivos'
};
