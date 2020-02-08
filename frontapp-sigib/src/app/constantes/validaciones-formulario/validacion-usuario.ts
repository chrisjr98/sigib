import {Validators} from '@angular/forms';

export const VALIDACION_TITULO_USUARIO = [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(60),
];
export const MENSAJES_VALIDACION_TITULO_USUARIO = {
  required: 'El campo título es obligatorio',
  minlength: 'El campo título debe tener mínimo 3 caracteres',
  maxlength: 'El campo  título no debe tener mas de 60 caracteres ',
};
export const VALIDACION_DESCRIPCION_USUARIO = [
  Validators.required,
  Validators.minLength(10)
];
export const MENSAJES_VALIDACION_DESCRIPCION_USUARIO = {
  required: 'El campo descripción es obligatorio',
  minlength: 'El campo descripción debe tener mínimo 3 caracteres',
};

export const VALIDACION_NIVEL_USUARIO = [
  Validators.required,
];

export const MENSAJES_VALIDACION_NIVEL_USUARIO = {
  required: 'El campo nivel es obligatorio',
};

export const VALIDACION_TIPO_USUARIO = [
  Validators.required,
];

export const MENSAJES_VALIDACION_TIPO_USUARIO = {
  required: 'El campo tipo es obligatorio',
};

export const VALIDACION_CODIGO_ROL = [
  Validators.required,
  Validators.minLength(1),
  Validators.maxLength(5),
];
export const MENSAJES_VALIDACION_CODIGO_ROL = {
  required: 'El campo código es obligatorio',
  minlength: 'El campo código debe tener mínimo 3 caracteres',
  maxlength: 'El campo  código no debe tener mas de 5 caracteres ',
};
export const VALIDACION_NOMBRE_ROL = [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(60),
];
export const MENSAJES_VALIDACION_NOMBRE_ROL = {
  required: 'El campo nombre es obligatorio',
  minlength: 'El campo nombre debe tener mínimo 3 caracteres',
  maxlength: 'El campo  nombre no debe tener mas de 5 caracteres ',
};
