import {Validators} from '@angular/forms';

export const VALIDACION_TIPO_VALOR = [
  Validators.required,
  Validators.minLength(3),
  Validators.maxLength(40),
];

export const MENSAJES_VALIDACION_TIPO_VALOR = {
  required: 'El campo nombre es obligatorio',
  minlength: 'El campo nombre debe tener mínimo 3 caracteres',
  maxlength: 'El campo nombre no debe tener más de 40 caracteres'
};
