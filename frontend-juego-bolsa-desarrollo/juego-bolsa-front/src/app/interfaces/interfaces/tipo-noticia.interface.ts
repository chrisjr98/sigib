import {NoticiaInterface} from './noticia.interface';

export interface TipoNoticiaInterface {
  id?: number;
  nombre?: string;
  habilitado?: number;
  noticia?: NoticiaInterface[];
  bloquearBoton?: number | boolean;
}
