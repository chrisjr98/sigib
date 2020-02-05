import { Materia } from './materia';
import { Profesor } from './profesor';

export class Curso{

grupo: string;
materia:  Materia["nombre"];
periodoacad: string;
horario: string;
aula:   string;
profesor: Profesor["nombre"];
numalumnosmax: number;
}
