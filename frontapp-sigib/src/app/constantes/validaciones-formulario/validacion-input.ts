import { Validators } from '@angular/forms';
import {SOLO_ENTEROS_O_DECIMALES__POSITIVOS} from '../patrones';

export const VALIDACION_NOTA = [
  Validators.required,
  Validators.pattern(SOLO_ENTEROS_O_DECIMALES__POSITIVOS)
];
