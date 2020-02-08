import {Validators} from '@angular/forms';
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
  Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/g)
];
export const MENSAJES_VALIDACION_NOMBRE_ROL = {
  required: 'El campo nombre es obligatorio',
  minlength: 'El campo nombre debe tener mínimo 3 caracteres',
  maxlength: 'El campo  nombre no debe tener mas de 5 caracteres ',
  pattern: 'El campo solo puede tener letras, acentos y ñ'
};
