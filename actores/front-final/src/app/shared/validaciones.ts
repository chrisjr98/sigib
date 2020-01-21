import {Validators, AbstractControl, ValidatorFn} from '@angular/forms';


/****************   MENSAJES    ************ */
export const mensajesValidacionFechaSimple = {
  required: 'este campo es obligatorio',
  pattern: 'la fecha debe tener el formato dd-mm-yyyy',
};

export const mensajesValidacionObligatorio = {
  required: 'este campo es obligatorio',
  pattern: 'este campo es obligatorio',
};

export const mensajesValidacionLetras = {
  required: 'este campo es obligatorio',
  pattern: 'el campo solo puede tener letras y numeros',
  minlength: 'este campo no tiene la longitud minima de 3'
};

export const mensajesValidacionNumero = {
  required: 'este campo es obligatorio',
  pattern: 'el campo debe tener unicamente numeros',
};

export const mensajesValidacionAnio = {
  required: 'el anio es obligatorio',
  pattern: 'el campo es un numero entero',
};

export const mensajesValidacionDecimal = {
  required: 'este campo es obligatorio',
  pattern: 'el campo debe tener unicamente numeros y  un punto',
};

export const mensajesValidacionCorreo = {
  required: 'este campo es obligatorio',
  pattern: 'ingrese un correo valido ej. alguien@example.com',
  noexiste: 'este correo NO existe'
};
/********************   VALIDACIONES    *********************************** */
export const validacionFechaSimple = [
  Validators.required,
  // Validators.pattern(/^[0-9]{4}[-\/](((0)[0-9])|((1)[0-2]))[\/-]([0-2][0-9]|(3)[0-1])$/i),
];

export const validacionLetras = [
  Validators.required,
  Validators.pattern(/^([A-Za-z]+[\s]?)+$/),
  Validators.minLength(3)
];

export const validacionNumero = [
  Validators.required,
  Validators.pattern(/^[0-9]+$/),
];

export const validacionObligatoria = [
  Validators.required,
  Validators.pattern(/^((?!Seleccionar Una).)*$/),
];

export const validacionAnio = [
  Validators.required,
  Validators.pattern(/^[0-9]{4}$/),
];

export const validacionDecimal = [
  Validators.required,
  Validators.pattern(/^[0-9]+([.][0-9]+)?$/),
];

export const validacionCorreo = [
  Validators.required,
  Validators.pattern(/^([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$/),
];

/*******************    FUNCIONES VALIDACION    *************************** */

export function setearMensajes(valor: AbstractControl, mensajesValidacion): string[] {
  let mensajesError = [];
  const esInvalidoCampo = (valor.dirty || valor.touched) &&  valor.errors != null;

  if (esInvalidoCampo) {
    mensajesError = Object.keys(valor.errors).map((atributo) => {
      return`${mensajesValidacion[atributo]}`;
    });
  }
  return mensajesError;
}
