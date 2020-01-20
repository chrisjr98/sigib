import {Validators} from '@angular/forms';

export const VALIDACION_NOMBRE_EMISOR = [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(50),
];

export const MENSAJES_VALIDACION_NOMBRE_EMISOR = {
  required: 'El campo nombre es obligatorio',
  minlength: 'El campo nombre debe tener mínimo 3 caracteres',
  maxlength: 'El campo nombre no debe tener más de 50 caracteres'
};

export const VALIDACION_DESCRIPCION = [
  Validators.required,
  Validators.minLength(5),
  Validators.maxLength(100),
];
export const MENSAJES_VALIDACION_DESCRIPCION = {
  required: 'El campo descripción es obligatorio',
  minlength: 'El campo descripción debe tener mínimo 5 caracteres',
  maxlength: 'El campo  descripción no debe tener más de 100 caracteres ',
};

export const VALIDACION_PATH_LOGO = [
  Validators.required,
];
export const MENSAJES_VALIDACION_OATH_LOGO_EMISOR = {
  required: 'El logo  es obligatorio',
};
