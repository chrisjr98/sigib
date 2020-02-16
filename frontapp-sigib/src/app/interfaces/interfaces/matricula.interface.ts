import {EstudianteInterface} from './estudiante.interface';
import {CursoInterface} from './curso.interface';

export interface MatriculaInterface {
  id?: number;
  estudiante: number  | EstudianteInterface;
  cursos: number  | CursoInterface;
}
