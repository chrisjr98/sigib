import { Materia } from 'src/app/clases/materia';
import { Profesor } from 'src/app/clases/profesor';


export interface CursoInterface{
grupo: string;
materia:  Materia["nombre"];
periodoacad: string;
horario: string;
aula:   string;
profesor: Profesor["nombre"];
numalumnosmax: number;
}
