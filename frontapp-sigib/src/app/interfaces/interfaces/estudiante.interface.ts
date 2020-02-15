import {UsuarioInterface} from './usuario.interface';

export interface EstudianteInterface {
  id?: number;
  codigo: string;
  cedula: string;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  carrera: any;
  usuario?: number | UsuarioInterface;
}
