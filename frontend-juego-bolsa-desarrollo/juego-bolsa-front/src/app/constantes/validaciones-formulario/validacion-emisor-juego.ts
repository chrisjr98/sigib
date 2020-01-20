import {Validators} from '@angular/forms';
import {SOLO_ENTEROS_O_DECIMALES__POSITIVOS} from '../patrones';

export const VALIDACION_PRECIO_ACTUAL = [
  Validators.required,
  Validators.pattern(SOLO_ENTEROS_O_DECIMALES__POSITIVOS)
];

export const MENSAJES_VALIDACION_PRECIO_ACTUAL = {
  required: 'El campo precio actual es obligatorio',
  pattern: 'El campo precio actual debe tener numeros enteros o decimales positivos'

};

export const VALIDACION_NUMERO_DE_ACCIONES = [
  Validators.required,
  Validators.pattern(SOLO_ENTEROS_O_DECIMALES__POSITIVOS)
];

export const MENSAJES_VALIDACION_NUMERO_DE_ACCIONES = {
  required: 'El campo numero de acciones es obligatorio',
  pattern: 'El campo numero de acciones debe tener numeros enteros o decimales positivos'
};

export const VALIDACION_NUMERO_DE_ACCIONES_VENDIDAS = [
  Validators.required,
  Validators.pattern(SOLO_ENTEROS_O_DECIMALES__POSITIVOS)
];

export const MENSAJES_VALIDACION_NUMERO_DE_ACCIONES_VENDIDAS = {
  required: 'El campo numero de acciones vendidas es obligatorio',
  pattern: 'El campo numero de acciones vendidas debe tener numeros enteros o decimales positivos'
};

export const VALIDACION_NUMERO_DE_ACCIONES_TOTALES = [
  Validators.required,
  Validators.pattern(SOLO_ENTEROS_O_DECIMALES__POSITIVOS)
];

export const MENSAJES_VALIDACION_NUMERO_DE_ACCIONES_TOTALES = {
  required: 'El campo numero de acciones totales es obligatorio',
  pattern: 'El campo numero de acciones totales debe tener numeros enteros o decimales positivos'
};
