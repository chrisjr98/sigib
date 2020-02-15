import { Validators } from '@angular/forms';
import {LETRAS_NUMEROS_ESPACIOS, RANGO_NUMEROS_10_20, SOLO_ENTEROS} from '../patrones';

export const VALIDACION_GRUPO_CURSO = [
  Validators.required,

];
export const MENSAJES_VALIDACION_GRUPO_CURSO = {
  required: 'Por favor seleccione un grupo',
};

export const VALIDACION_MATERIA_CURSO = [
  Validators.required,

];
export const MENSAJES_VALIDACION_MATERIA_CURSO = {
  required: 'Por favor seleccione una materia',
};


export const VALIDACION_PROFESOR_CURSO = [
  Validators.required,

];
export const MENSAJES_VALIDACION_PROFESOR_CURSO = {
  required: 'Por favor seleccione una materia',
};

export const VALIDACION_HORARIO_CURSO = [
  Validators.required,

];
export const MENSAJES_VALIDACION_HORARIO_CURSO = {
  required: 'Por favor seleccione un horario',
};

export const VALIDACION_AULA_CURSO = [
  Validators.required,
  Validators.maxLength(3),
  Validators.pattern(SOLO_ENTEROS)

];
export const MENSAJES_VALIDACION_AULA_CURSO = {
  required: 'Por favor ingrese una aula',
  maxlength: 'Aula no válida (maximo 3 caracteres)',
  pattern: 'Aula no valida(solo números)'
};

export const VALIDACION_MAXIMO_CURSO = [
  Validators.required,
  Validators.maxLength(2),
  Validators.pattern(RANGO_NUMEROS_10_20)

];
export const MENSAJES_VALIDACION_MAXIMO_CURSO = {
  required: 'Por favor ingrese el maximo de estudiantes',
  maxlength: 'Número maximo no válido (maximo 2 caracteres)',
  pattern: 'Número maximo no válido (rango de 10 a 20)'
};
