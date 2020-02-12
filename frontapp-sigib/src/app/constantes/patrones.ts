export const SOLO_LETRAS_ESPACIOS = '[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$';

export const SOLO_ENTEROS_O_DECIMALES__POSITIVOS = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/ ;

export const SOLO_LETRAS_ESPACIOS_NUMEROS_TILDE_ENIES = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9.¨\s]*$/;

export const LETRAS_NUMEROS_ESPACIOS = /^[_A-z0-9À-ÿ\u00f1\u00d1]*((-|\s)*[_A-z0-9À-ÿ\u00f1\u00d1])*$/;

export const SOLO_ENTEROS = /^[0-9]+$/;

export const EXPRESION_CORREO = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export const EXPRESION_TELEFONO =/^(?:09(?:[0-9]{7})(?:[1-9]))$/
