import {Validators} from '@angular/forms';

export const VALIDACION_TITULO_NOTICIA = [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(60),
];
export const MENSAJES_VALIDACION_TITULO_NOTICIA = {
  required: 'El campo título es obligatorio',
  minlength: 'El campo título debe tener mínimo 3 caracteres',
  maxlength: 'El campo  título no debe tener mas de 60 caracteres ',
};
export const VALIDACION_DESCRIPCION_NOTICIA = [
  Validators.required,
  Validators.minLength(10)
];
export const MENSAJES_VALIDACION_DESCRIPCION_NOTICIA = {
  required: 'El campo descripción es obligatorio',
  minlength: 'El campo descripción debe tener mínimo 3 caracteres',
};

export const VALIDACION_NIVEL_NOTICIA = [
  Validators.required,
];

export const MENSAJES_VALIDACION_NIVEL_NOTICIA = {
  required: 'El campo nivel es obligatorio',
};

export const VALIDACION_TIPO_NOTICIA = [
  Validators.required,
];

export const MENSAJES_VALIDACION_TIPO_NOTICIA = {
  required: 'El campo tipo es obligatorio',
};